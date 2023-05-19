import React from 'react';
import { Link } from 'react-router-dom';
import donationImage from './4005934.jpg'; // Update the relative path

const HomePage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        <img src={donationImage} alt="Donation" style={{ width: '700px', height: '500PX' }} />
      </div>
      <div>
        <h1>Welcome to Our Spark Welfare Fund</h1>
        <p>
          We are dedicated to making a difference in the world. Your generous donations help support our mission.
        </p>
        <Link to="/donate" className="btn btn-primary">Donate Now</Link>
      </div>
    </div>
  );
};

export default HomePage;






