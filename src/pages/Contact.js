import React, { useState } from 'react';
import ContactPic from '../assets/images/ContactPic.svg';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [contactData, setContactData] = useState({
    email: "",
    password: "",
    message: ""
  });

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", contactData);
  };

  return (
    <>
      <Header />
      <section className="flex flex-wrap justify-center items-start gap-10 px-10 py-16 bg-white">
        {/* Left Side - Contact Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-3 text-black">Get in touch</h2>
          <p className="text-gray-600 mb-6">We are here for you! How can we help?</p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email"
              value={contactData.email} 
              onChange={handleChange} 
              required 
              className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <label className="mb-1 font-medium">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password"
              value={contactData.password} 
              onChange={handleChange} 
              required 
              className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <label className="mb-1 font-medium">Message</label>
            <textarea 
              name="message" 
              rows="4" 
              placeholder="Enter your message"
              value={contactData.message} 
              onChange={handleChange} 
              required 
              className="p-3 mb-6 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <button 
              type="submit" 
              className="bg-black text-white py-3 text-lg rounded-lg hover:bg-gray-800 transition duration-300">
              Submit
            </button>
          </form>
        </div>

        {/* Right Side - Image and Contact Info */}
        <div className="w-full md:w-1/3 text-center">
          <img src={ContactPic} alt="Luxury Watch" className="w-64 mx-auto mb-6" />

          <div className="flex flex-col items-center space-y-4 text-gray-700 text-lg">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-black" /> Beirut, Hamra
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-black" /> +71588889
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-black" /> hello@gmail.com
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
