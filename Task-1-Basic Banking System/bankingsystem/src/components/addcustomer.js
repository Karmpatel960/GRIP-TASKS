import React, { useState } from 'react';

function AddCustomer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to add the customer using an API call
    // You can use the Fetch API or any HTTP client library (e.g., Axios)

    const customerData = {
      firstName,
      lastName,
      email,
      accountNumber
    };

    // Make the API call to add the customer
    // For example, using the Fetch API:
    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data or perform any necessary actions
        console.log('Customer added successfully:', data);
        // Reset the form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setAccountNumber('');
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
