const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dbURI = config.get('mongoURI');

app.use(cors());
app.use(express.json());
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
  },
  transactions: [
    {
      senderAccount: {
        type: String,
        required: true
      },
      receiverAccount: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

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

app.get('/api/transactions', async (req, res) => {
  try {
    const customers = await Customer.find({}, 'transactions');
    const transactions = customers.flatMap(customer => customer.transactions);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST /transfer endpoint for handling money transfer
app.post('/transfer', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
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

    // Create a new transaction object for sender
    const senderTransaction = {
      senderAccount: senderAccountNumber,
      receiverAccount: receiverAccountNumber,
      amount: amount,
    };

    sender.transactions.push(senderTransaction);

    await sender.save();

    console.log('Sender:', sender);
    console.log('Receiver:', receiver);

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


//const express = require('express');
//const cors = require('cors');
//const app = express();
//
//app.use(cors());
//app.use(express.json());
//
//const connectDB = require('./config/db');
//connectDB();
//
//// Import the Customer model and transactionRoutes
//const Customer = require('./models/Customer');
//const transactionRoutes = require('./routes/customerroute');
//
////// Get all customers
////app.get('/data', async (req, res) => {
////  try {
////    const customers = await Customer.find();
////    res.json(customers);
////  } catch (error) {
////    console.error('Error fetching customers:', error);
////    res.status(500).json({ error: 'Failed to fetch customers' });
////  }
////});
//
//// Use the transactionRoutes
//app.use('/api', customerroute);
//
//const port = process.env.PORT || 8082;
//app.listen(port, () => {
//  console.log(`Server running on port ${port}`);
//});
