const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const customerRoutes = require('./routes/customerroute');
app.use('/customers', customerRoutes);

// Start the server
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
