const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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

customerSchema.plugin(uniqueValidator);

customerSchema.pre('save', function (next) {
  if (!this.accountNumber) {
    // Generate a unique account number
    const generateAccountNumber = () => {
      const randomNumber = Math.floor(Math.random() * 1000000000);
      const accountNumber = randomNumber.toString().padStart(10, '0');
      return accountNumber;
    };

    let accountNumber = generateAccountNumber();
    const self = this;

    // Check if the generated account number is already in use
    mongoose.models.Customer.findOne({ accountNumber }, function (err, customer) {
      if (err) {
        return next(err);
      }
      if (customer) {
        // If the account number is already in use, regenerate a new one
        accountNumber = generateAccountNumber();
        self.accountNumber = accountNumber;
        next();
      } else {
        // If the account number is unique, assign it to the customer
        self.accountNumber = accountNumber;
        next();
      }
    });
  } else {
    next();
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

