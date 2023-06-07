//const express = require('express');
import { app } from "./app.js";
//const mongoose = require('mongoose');
import Razorpay from 'razorpay';
//const Razorpay = require('razorpay');
//const cors = require('cors');
//import { config } from 'dotenv';
//require('dotenv').config();
//const app = express();
//
//app.use(cors());
//app.use(express.json());
//
//const uri = process.env.ATLAS_URI;
//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => {
//    console.log('Connected to MongoDB');
//  })
//  .catch((error) => {
//    console.error('Failed to connect to MongoDB:', error);
//    process.exit(1);
//  });

export const instance = new Razorpay({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret
});


const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

