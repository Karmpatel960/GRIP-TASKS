const express = require('express');
const config = require('config');
const cors = require('cors');
const { connectDB } = require('./models');
const customerRoutes = require('./routes/customers');

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();


// Routes
app.use('/', customerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
