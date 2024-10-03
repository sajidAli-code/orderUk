// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();  // for environment variables

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = "whsec_e3d35b6a16da614c232556ede7dbbda650285cf6019bacc68b3da7c091cb852d";

// models importing
const Category = require('./models/Category');
const Food = require('./models/Foods');
const User = require('./models/User');
const Order = require('./models/Order')

// Create an Express application
const app = express();

// Middleware
app.use(cors());               // Enable CORS
app.use(bodyParser.json());     // Parse incoming JSON data

// Database Connection
const uri = process.env.MONGO_URI;  // MongoDB connection string from environment variables
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Routes
app.get('/get_categories', async (req, res) => {
    const results = await Category.find();
    res.send(results);
});

app.get('/get_categories_by_id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Category.findOne({ _id: id });
        res.status(200).send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.get("/get_foods_groups/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Food.aggregate([
            {
                $match: {
                    category: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: "$foodType",
                    foods: {
                        $push: "$$ROOT"
                    }
                }
            }
        ]);
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.post("/register", async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(403).json({ message: 'User already available!' }); // Return to prevent further execution
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create the user
        const userCreated = await User.create(
            {
                userName,
                email: email,
                password: hashedPassword
            }
        );

        // Send a successful response with the created user data
        res.status(201).json({ message: 'User created successfully!', user: userCreated });
    } catch (error) {
        console.error(error);
        // Check if headers were already sent before sending error response
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, userName: user.userName },
            'hello1234', // Replace with your secret key
            { expiresIn: '1h' }
        );

        // Send a successful response with user data and token
        res.status(200).json({ message: 'Login successful!', user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// checkout api
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: ['PK', 'US'],
            },
            phone_number_collection: {
                enabled: true,
            },
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:5173/cancel"
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/placeOrder', async (req, res) => {
    const { session_id, userId } = req.body;

    if (!session_id) {
        return res.status(400).send({ error: "session_id is required" });
    }

    try {
        // Check if an order with the same session_id already exists
        const existingOrder = await Order.findOne({ sessionId: session_id });

        if (existingOrder) {
            return res.status(200).send({ message: "Order already exists", order: existingOrder });
        }

        // Retrieve session details from Stripe
        const sessionDetails = await stripe.checkout.sessions.retrieve(session_id);
        const productList = await stripe.checkout.sessions.listLineItems(session_id);

        // Generate a 9-character alphanumeric order number using uuid
        const uniqueOrderNumber = uuidv4().replace(/-/g, '').slice(0, 9); // Remove dashes and take the first 9 characters

        // Create a new order if none exists
        const orderCreated = await Order.create({
            userId: userId,
            sessionId: session_id,
            productList: productList.data,
            shippingAddress: sessionDetails.customer_details,
            orderStatus: 'Placed',
            orderNumber: uniqueOrderNumber,
        });

        res.send(orderCreated);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({ error: "Error creating order" });
    }
});

app.get('/getOrder/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Order.find({ userId: id });
        res.status(200).send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

// Server Setup
const port = process.env.PORT || 3300;  // Use port from environment or default to 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});