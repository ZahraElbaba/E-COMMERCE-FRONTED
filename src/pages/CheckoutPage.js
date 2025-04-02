import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Calculate prices
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const shippingPrice = location.state?.shippingPrice || 20.0;
  const grandTotal = (totalPrice + shippingPrice).toFixed(2);

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState({
    city: "",
    building: "",
    floor: "",
    street: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleCheckout = async () => {
    const userId = 1;

    try {
      // 1️⃣ Create Order
      const orderResponse = await fetch("http://localhost:4000/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, total_amount: totalPrice.toFixed(2), status: "IN_PROGRESS" }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");
      const orderData = await orderResponse.json();
      const orderId = orderData.orderId; // ✅ Corrected response handling

      // 2️⃣ Add Order Items
      for (const item of cart) {
        const itemData = {
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
        };
        console.log("📦 Sending Order Item Data:", itemData);

        const itemsResponse = await fetch("http://localhost:4000/api/orderItems/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        });
        if (!itemsResponse.ok) throw new Error("Failed to add order items");
      }

      // 3️⃣ Create Shipping Address
      const addressResponse = await fetch("http://localhost:4000/api/shipping-address/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...shippingAddress, user_id: userId }),
      });

      if (!addressResponse.ok) throw new Error("Failed to create shipping address");
      const addressData = await addressResponse.json();
      const shippingAddressId = addressData.data.id; // ✅ Matches backend response

      // 4️⃣ Create Shipping Record
      const shippingResponse = await fetch("http://localhost:4000/api/shipping/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          shipping_address_id: shippingAddressId,
          shipping_amount: shippingPrice,
        }),
      });

      if (!shippingResponse.ok) throw new Error("Failed to create shipping record");

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Error processing order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>

      {/* Grand Total */}
      <div className="mb-6 flex justify-between items-center border-t pt-4">
        <h3 className="text-lg font-medium">Grand Total:</h3>
        <p className="text-xl font-bold">${grandTotal}</p>
      </div>

      {/* Shipping Address */}
      <div className="mb-4">
        <h2 className="text-xl font-medium">Shipping Address</h2>
        <form>
          {["city", "building", "floor", "street"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={shippingAddress[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          ))}
        </form>
      </div>

      {/* Checkout Button */}
      <button onClick={handleCheckout} className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md">
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;
