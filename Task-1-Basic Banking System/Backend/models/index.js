const mongoose = require('mongoose');
require('dotenv').config();

//const dbURI = process.env.mongoURI; // Update the variable name to MONGO_URI
  const dbURI = 'mongodb+srv://karmpatel960:MIZaAphZaYerHzSZ@cluster0.c87dvab.mongodb.net/?retryWrites=true&w=majority';
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
