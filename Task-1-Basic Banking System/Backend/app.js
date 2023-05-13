//const express = require('express');
//const connectDB = require('./config/db');
//const config = require('config');
//
//const app = express();
//
//// Connect to MongoDB
//connectDB();
//
//// Middleware
//app.use(express.json());
//
//// Routes
//const customerRoutes = require('./routes/api/customerroute.js'); // Updated path
//app.use('/customers', customerRoutes);
//
//// Start the server
//const port = process.env.PORT || 8082;
//app.listen(port, () => console.log(`Server running on port ${port}`));

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const dbURI = config.get('mongoURI');

// Customer schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Customer model
const Customer = mongoose.model('Customer', customerSchema);

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Get all customers
app.get('/data', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
