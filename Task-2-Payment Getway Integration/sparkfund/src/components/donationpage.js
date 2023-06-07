import React, { useState } from 'react';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  const handleSubmit = async (amount) => {
//    event.preventDefault();
    // Perform donation submission logic here
//    console.log(`Donation: ${name}, ${email}, ${amount}`);
//    // Reset form fields
//    setName('');
//    setEmail('');
//    setAmount('');
    const { data } = await axios.post("http://localhost:8082/api/checkout",{
           amount,
    })
    console.log(data)

  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <h1 className="text-center mb-4">Donation Page</h1>
          <Form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default DonationPage;


