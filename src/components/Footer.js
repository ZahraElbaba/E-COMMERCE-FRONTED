


import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Our Information Section */}
        <div className="footer-section">
          <h3>Our information</h3>
          <p>1234 - Peru</p>
          <p>La Libertad 43210</p>
          <p>123-456-789</p>
        </div>

        {/* About Us Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Support Center</p>
          <p>Customer Support</p>
          <p>About Us</p>
          <p>Copy Right</p>
        </div>

        {/* Product Section */}
        <div className="footer-section">
          <h3>Product</h3>
          <p>Road bikes</p>
          <p>Mountain bikes</p>
          <p>Electric</p>
          <p>Accessories</p>
        </div>

        {/* Social Icons Section */}
        <div className="footer-section social">
          <h3>Social</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="footer-line" />

      {/* Copyright Section */}
      <p className="footer-copyright">© Copyright 2025. All rights reserved</p>
    </footer>
  );
};

export default Footer;
