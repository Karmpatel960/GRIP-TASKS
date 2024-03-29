const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

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

    const customer = new Customer({
      firstName,
      lastName,
      email,
      balance: amount,
    });

    await customer.save();

    return res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error adding customer:', error);
    return res.status(500).json({ error: 'Failed to add customer' });
  }
});

router.get('/api/transactions', async (req, res) => {
  try {
    const customers = await Customer.find({}, 'transactions').sort({ 'transactions.timestamp': -1 });
    const transactions = customers.flatMap((customer) =>
      customer.transactions.map((transaction) => ({
        senderAccount: transaction.senderAccount,
        receiverAccount: transaction.receiverAccount,
        amount: transaction.amount,
        timestamp: transaction.timestamp,
      }))
    );
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

router.post('/transfer', async (req, res) => {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

    const sender = await Customer.findOne({ accountNumber: senderAccountNumber });
    const receiver = await Customer.findOne({ accountNumber: receiverAccountNumber });

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver account not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

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
      transactionData,
    });
  } catch (error) {
    console.error('Error transferring money:', error);
    return res.status(500).json({ message: 'An error occurred while transferring money' });
  }
});

module.exports = router;
