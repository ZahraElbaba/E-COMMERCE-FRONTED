import React from "react";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
