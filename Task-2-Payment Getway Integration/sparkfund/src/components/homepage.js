import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import donationImage from './4005934.jpg'; // Import the image file

const HomePage = () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={donationImage} alt="Donation" style={{ width: '50%', marginRight: '20px' }} />
        <div>
          <h1>Welcome to Our Donation Website</h1>
          <p>
            We are dedicated to making a difference in the world. Your generous donations help support our mission.
          </p>
          <Link to="/donate">Donate Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
