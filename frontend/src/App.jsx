import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import FoodCategory from './pages/FoodCategory';
import Navbar from './components/Navbar';
import { ContextProvider } from './context/Context';
import FAQ from './components/FAQ';
import StatsBanner from './components/StatsBanner';
import Footer from './components/Footer';
import UserAuth from './pages/UserAuth';
import Login from './pages/Login';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancelled from './components/PaymentCancelled';
import Profile from './pages/Profile';
import TrackOrder from './pages/TrackOrder';

const App = () => {
  const location = useLocation();

  // Check if the current path is /userAuth
  const isAuthPage = location.pathname.split('/')[1] === "userAuth";

  return (
    <ContextProvider>
      <div className="flex items-center flex-col gap-6">
        {/* Only show Navbar, FAQ, StatsBanner, and Footer when not on the userAuth page */}
        {!isAuthPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food_category/:id" element={<FoodCategory />} />
          <Route path="/userAuth/register" element={<UserAuth />} />
          <Route path="/userAuth/login" element={<Login />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancelled />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trackOrder/:id" element={<TrackOrder />} />
        </Routes>
        {/* Only show FAQ, StatsBanner, and Footer when not on the userAuth page */}
        {!isAuthPage && <FAQ />}
        {!isAuthPage && <StatsBanner />}
        {!isAuthPage && <Footer />}
      </div>
    </ContextProvider>
  );
}

export default App;