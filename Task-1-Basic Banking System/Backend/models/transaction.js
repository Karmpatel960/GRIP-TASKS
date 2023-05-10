const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderAccount: {
    type: String,
    required: true,
  },
  receiverAccount: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
