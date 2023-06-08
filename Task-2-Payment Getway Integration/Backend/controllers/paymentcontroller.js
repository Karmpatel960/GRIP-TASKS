import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create order.",
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, amount } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        name,
        email,
        amount
      });

      // Log payment details
      console.log("Payment details:", {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to store payment details.",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid signature.",
    });
  }
};