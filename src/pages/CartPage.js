import React from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <button onClick={() => navigate(-1)} className="text-black hover:text-gray-600">
                    ✖
                </button>
            </div>

            <div className="p-4">
                <p className="text-gray-600">Your cart is empty.</p>
            </div>
        </div>
    );
};

export default CartPage;
