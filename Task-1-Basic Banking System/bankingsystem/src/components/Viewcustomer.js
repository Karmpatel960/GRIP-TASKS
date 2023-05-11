import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

const fetchCustomers = async () => {
  try {
    const response = await fetch('http://localhost:8082/data');
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h1 className="text-center">Customer List</h1>
        <Link to="/addcustomer" className="btn btn-primary">
          Add Customer
        </Link>
      </div>
      <div className="row">
        {customers.map((customer) => (
          <div className="col-md-4 mb-4" key={customer._id}>
            <div className="card rounded">
              <div className="card-body">
                <h5 className="card-title">
                  {customer.firstName} {customer.lastName}
                </h5>
                <p className="card-text">
                  <strong>Email:</strong> {customer.email}
                </p>
                <p className="card-text">
                  <strong>Account Number:</strong> {customer.accountNumber}
                </p>
                <p className="card-text">
                  <strong>Balance:</strong> {customer.balance}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerList;


