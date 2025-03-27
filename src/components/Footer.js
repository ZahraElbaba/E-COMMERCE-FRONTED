import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black text-center p-6">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-start">
        {/* Our Information Section */}
        <div className="flex-1 min-w-[150px] m-2">
          <h3 className="text-lg font-semibold mb-2">Our Information</h3>
          <p className="text-gray-600 text-sm">1234 - Peru</p>
          <p className="text-gray-600 text-sm">La Libertad 43210</p>
          <p className="text-gray-600 text-sm">123-456-789</p>
        </div>

        {/* About Us Section */}
        <div className="flex-1 min-w-[150px] m-2">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-gray-600 text-sm">Support Center</p>
          <p className="text-gray-600 text-sm">Customer Support</p>
          <p className="text-gray-600 text-sm">About Us</p>
          <p className="text-gray-600 text-sm">Copy Right</p>
        </div>

        {/* Product Section */}
        <div className="flex-1 min-w-[150px] m-2">
          <h3 className="text-lg font-semibold mb-2">Product</h3>
          <p className="text-gray-600 text-sm">Road bikes</p>
          <p className="text-gray-600 text-sm">Mountain bikes</p>
          <p className="text-gray-600 text-sm">Electric</p>
          <p className="text-gray-600 text-sm">Accessories</p>
        </div>

        {/* Social Icons Section */}
        <div className="flex-1 min-w-[150px] m-2 text-center">
          <h3 className="text-lg font-semibold mb-2">Social</h3>
          <div className="flex justify-center gap-4 text-xl text-gray-600">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="my-6 w-11/12 border-t border-gray-300 mx-auto" />

      {/* Copyright Section */}
      <p className="text-gray-500 text-sm">© Copyright 2025. All rights reserved</p>
    </footer>
  );
};

export default Footer;