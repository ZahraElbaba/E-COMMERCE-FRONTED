import React from "react";
import { Link } from "react-router-dom";

const Header = ({ scrollToAboutUs }) => {
    return (
        <header className="bg-white p-4 shadow-md flex justify-between items-center">
            <nav className="flex justify-center flex-grow">
                <ul className="flex space-x-6">
                    <li><Link to="/" className="text-black font-bold hover:text-gray-600">Home</Link></li>
                    <li><Link to="/categories" className="text-black font-bold hover:text-gray-600">Categories</Link></li>
                    <li><Link to="/products" className="text-black font-bold hover:text-gray-600">Recent Products</Link></li>
                    <li><Link to="/contact" className="text-black font-bold hover:text-gray-600">Contact</Link></li>
                    <li>
                        <button onClick={scrollToAboutUs} className="text-black font-bold hover:text-gray-600 bg-transparent border-none cursor-pointer">
                            About Us
                        </button>
                    </li>
                    <li><Link to="/login" className="text-black font-bold hover:text-gray-600">Login</Link></li>
                    <li><Link to="/register" className="text-black font-bold hover:text-gray-600">Register</Link></li>
                </ul>
            </nav>

            {/* ✅ Cart Icon - Navigates to Cart Page */}
            <Link to="/cart" className="relative p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l1 5m0 0h13l1-5H6m0 0l-1 5m0 0a2 2 0 100 4h13a2 2 0 100-4M9 17a2 2 0 100 4 2 2 0 000-4m6 0a2 2 0 100 4 2 2 0 000-4" />
                </svg>
            </Link>
        </header>
    );
};

export default Header;
