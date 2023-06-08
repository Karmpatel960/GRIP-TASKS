import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const DonationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const checkoutHandler = async (event) => {
    event.preventDefault();
    const { data: { key } } = await axios.get("http://localhost:8082/api/getkey")
    // Submit donation details to backend API
    const { data: { order } } = await axios.post('http://localhost:8082/api/checkout', {
      amount: Number(amount),
    });

    const options = {
      key,
      amount: order.amount,
      currency: 'INR',
      name: 'Spark Fund',
      description: 'RazorPay',
      order_id: order.id,
      callback_url: 'http://localhost:8082/api/paymentverification',
      prefill: {
        name: name,
        email: email,
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#121212',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h1 className="text-center mb-4">Donation Page</h1>
        <Form onSubmit={checkoutHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Donate
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default DonationPage;




