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

router.post('/api/customers', async (req, res) => {
  try {
    const { firstName, lastName, email, amount } = req.body;

    // Create a new customer instance
    const customer = new Customer({
      firstName,
      lastName,
      email,
      balance: amount,
    });

    // Save the customer to the database
    await customer.save();

    return res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error adding customer:', error);
    return res.status(500).json({ error: 'Failed to add customer' });
  }
});

router.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Customer.aggregate([
      { $unwind: '$transactions' }, // Unwind the transactions array
      { $sort: { 'transactions.timestamp': -1 } }, // Sort by transaction timestamp in descending order
      { $project: { _id: 0, 'transactions': 1 } }, // Project only the transactions field
    ]);

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

router.post('/transfer', async (req, res) => {
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

    // Create a new transaction object for the sender and receiver
    const transactionData = {
      senderAccount: senderAccountNumber,
      receiverAccount: receiverAccountNumber,
      amount: amount,
    };

    sender.transactions.push(transactionData);
    receiver.transactions.push(transactionData);

    await sender.save();
    await receiver.save();

    console.log('Sender:', sender);
    console.log('Receiver:', receiver);

    return res.status(200).json({
      message: 'Money transfer successful',
      transactionData, // Return the transaction data in the response
    });
  } catch (error) {
    console.error('Error transferring money:', error);
    return res.status(500).json({ message: 'An error occurred while transferring money' });
  }
});

module.exports = router;
