import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/homepage.js';
import DonationPage from './components/donationpage.js';
import AppHeader from './components/AppHeader.js';
import AboutUsPage from './components/AboutUspage.js';
import PaymentSuccess from './components/PaymentSuccess.js';

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;


