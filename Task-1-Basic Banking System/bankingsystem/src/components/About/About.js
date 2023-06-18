import React from 'react';
import './About.css'; // import the About.css file

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="contact-container">
        <h2 className="contact-title">Contact Details</h2>
        <p className="contact-details">Email: info@bank.com</p>
        <p className="contact-details">Phone: +91 123 456 7890</p>
      </div>
      <div className="feedback-container">
        <h2 className="feedback-title">Feedback</h2>
        <textarea className="feedback-textarea" placeholder="Please leave your feedback here"></textarea>
        <button className="feedback-submit">Submit</button>
      </div>
    </div>
  );
};

export default About;


