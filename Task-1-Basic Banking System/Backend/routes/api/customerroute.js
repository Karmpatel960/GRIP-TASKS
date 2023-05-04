const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a customer by ID
router.patch('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/transfer', async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const fromCustomer = await Customer.findById(from);
    const toCustomer = await Customer.findById(to);
    if (!fromCustomer || !toCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    if (fromCustomer.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    fromCustomer.balance -= amount;
    toCustomer.balance += amount;
    await fromCustomer.save();
    await toCustomer.save();
    res.json({ message: 'Transfer completed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
