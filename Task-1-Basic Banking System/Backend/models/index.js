// models/index.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  Customer: require('./customer')
};
