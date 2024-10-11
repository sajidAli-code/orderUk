import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { io } from 'socket.io-client';

const INITIAL_CENTER = [-74.0242, 40.6941]; // Default center in case geolocation fails
const INITIAL_ZOOM = 10.12;

function MapContainer({ orderData }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const deliverManMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeRef = useRef(null); // Reference for the route layer

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [socket, setSocket] = useState(null);

  const [orderDest, setOrderDest] = useState();

  const getGeocodeData = async () => {
    const addressObj = orderData[0]?.shippingAddress?.address;
    const addressString = addressObj?.line1 + " " + addressObj?.city + " " + addressObj?.country;

    try {
      const response = await axios.post('http://localhost:3300/geocode', {
        address: addressString
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Geocode response:', response?.data?.results[0]?.geometry?.location);
      setOrderDest(response?.data?.results[0]?.geometry?.location)
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  };

  useEffect(() => {
    getGeocodeData()
  }, [orderData])

  // Function to add or update a marker at a given location
  const addOrUpdateMarker = (markerRef, location, label, markerColor) => {
    if (markerRef.current) {
      markerRef.current.setLngLat(location); // Update existing marker
    } else {
      // Create a new marker if one doesn't exist
      markerRef.current = new mapboxgl.Marker({ color: markerColor })
        .setLngLat(location)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(label))
        .addTo(mapRef.current);
    }
  };

  useEffect(() => {
    if (!orderDest) return; // Wait until orderDest is set

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; // Ensure the correct access token

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom,
    });

    // Function to draw a route between two points
    const drawRoute = (start, end) => {
      if (routeRef.current) {
        mapRef.current.removeLayer('route'); // Remove previous route layer
        mapRef.current.removeSource('route'); // Remove previous route source
      }

      const routeRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      fetch(routeRequest)
        .then((response) => response.json())
        .then((data) => {
          const route = data.routes[0].geometry.coordinates;
          const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          };

          // Add the route source and layer to the map
          mapRef.current.addSource('route', {
            type: 'geojson',
            data: geojson,
          });

          mapRef.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#89CFF0',
              'line-width': 8,
            },
          });
        })
        .catch((error) => console.error('Error fetching route:', error));
    };

    // Initialize Socket.IO client and connect to the server
    const socketInstance = io('http://localhost:3300'); // Adjust based on your backend URL
    setSocket(socketInstance);

    // Listen for location updates from the server
    socketInstance.on('locationUpdate', (data) => {
      const { longitude, latitude } = data;
      const userLocation = [longitude, latitude];
      mapRef.current.setCenter(userLocation); // Center the map on the new location
      addOrUpdateMarker(deliverManMarkerRef, userLocation, 'Deliver Man', 'blue'); // Add or update the marker on the map
      addOrUpdateMarker(destinationMarkerRef, [orderDest?.lng, orderDest?.lat], 'Destination', 'red');

      // Draw the route between the delivery person and the destination
      drawRoute(userLocation, [orderDest?.lng, orderDest?.lat]);
    });

    // Clean up the map and socket connection when the component unmounts
    return () => {
      mapRef.current.remove();
      socketInstance.disconnect();
    };
  }, [orderDest]); // Only re-run when `orderDest` is updated  

  useEffect(() => {
    // Emit user location when it is available
    if (navigator.geolocation && socket) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          socket.emit('updateLocation', { longitude, latitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, [socket]); // Dependency on `socket`

  return (
    <>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ position: 'relative', width: '100%', height: '100vh' }}
      />
    </>
  );
}

export default MapContainer;