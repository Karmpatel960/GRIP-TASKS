// routes/customers.js
const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Get all customers
router.get('/data', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get('/api/transactions', async (req, res) => {
  try {
    const customers = await Customer.find({}, 'transactions').sort({ timestamp: 1 });
    const transactions = customers.flatMap(customer => customer.transactions);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// ... Add other customer-related routes
router.post('/transfer', async (req, res) => {
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

module.exports = router;
