import express from "express";
import paymentroute from "./routes/paymentroute.js";
import { config } from "dotenv";
import cors from "cors";
config({path: "./config/config.env"});

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",paymentroute);
