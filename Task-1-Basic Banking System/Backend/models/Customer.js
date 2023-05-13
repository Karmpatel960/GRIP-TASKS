const mongoose = require('mongoose');

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
module.exports = Customer;
