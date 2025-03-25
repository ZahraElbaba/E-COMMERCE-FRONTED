


import React from "react";
import { Link } from "react-router-dom";

const Header = ({ scrollToAboutUs }) => {
    return (
        <header className="bg-white p-4 shadow-md">
            <nav className="flex justify-center">
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-black font-bold hover:text-gray-600">
                            Home
                        </Link>
                    </li>
                   

                    <li>
                        <Link to="/categories" className="text-black font-bold hover:text-gray-600">
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/recent-products" className="text-black font-bold hover:text-gray-600">
                            Recent Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-black font-bold hover:text-gray-600">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={scrollToAboutUs}
                            className="text-black font-bold hover:text-gray-600 bg-transparent border-none cursor-pointer"
                        >
                            About Us
                        </button>
                    </li>
                    <li>
                        <Link to="/login" className="text-black font-bold hover:text-gray-600">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-black font-bold hover:text-gray-600">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
