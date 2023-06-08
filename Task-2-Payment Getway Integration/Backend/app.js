import express from "express";
import paymentroute from "./routes/paymentroute.js";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

config({ path: "./config.env" });


export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentroute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.key_id })
);

const uri = process.env.ATLAS_URI; // Replace with your MongoDB connection URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
