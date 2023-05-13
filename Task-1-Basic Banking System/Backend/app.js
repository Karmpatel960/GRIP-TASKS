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
const cors = require('cors');
const app = express();
const dbURI = config.get('mongoURI');
app.use(cors());
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

// Assuming you have the necessary imports and setup for Express.js and MongoDB

// POST /transfer endpoint for handling money transfer
app.post('/transfer', async (req, res) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

    // Retrieve sender and receiver customer records from the database
    const sender = await Customer.findOne({ accountNumber: senderAccountNumber });
    const receiver = await Customer.findOne({ accountNumber: receiverAccountNumber });

    // Check if sender and receiver accounts exist
    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver account not found' });
    }

    // Check if the sender has sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update sender's and receiver's balances
    sender.balance -= amount;
    receiver.balance += amount;

    // Save the updated customer records
    await sender.save();
    await receiver.save();

    return res.status(200).json({ message: 'Money transfer successful' });
  } catch (error) {
    console.error('Error transferring money:', error);
    return res.status(500).json({ message: 'An error occurred while transferring money' });
  }
});

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
