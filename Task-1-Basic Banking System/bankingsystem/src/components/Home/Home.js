import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home d-flex align-items-center justify-content-center">
      <div className="container text-center">
        <h1>Welcome to Sparks Bank</h1>
        <p>
          This is The Basic Banking System that One Can transfer and see the details of Transaction Done By Customers
        </p>
        <h2>Our Services</h2>
        <div className="list-group">
          <a href="/" className="list-group-item list-group-item-action">All Customer Details</a>
          <a href="/transfer" className="list-group-item list-group-item-action">Easy Transfer</a>
          <a href="/about" className="list-group-item list-group-item-action">About Us Page</a>
          <a href="/transfer" className="list-group-item list-group-item-action">All Transaction Details</a>
          <a href="/viewcustomer" className="list-group-item list-group-item-action">And much more...</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
