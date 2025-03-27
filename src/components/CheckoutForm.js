import { useState, useEffect } from "react";


const CheckoutForm = ({ selectedProduct }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    // Fetch shipping amount dynamically from the backend
    fetch("/api/shipping")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json(); // Parse the response as JSON
      })
      .then((data) => {
        console.log(data); // Log the response to see the data
        if (data.data && data.data.length > 0) {
          setFormData({
            ...formData,
            shippingAmount: data.data[0].shipping_amount,
            orderId: data.data[0].id,
            userId: data.data[0].user_id,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching shipping data:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData, // Send all form data, including shipping info
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Order created successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Check if selectedProduct exists and has the necessary data
  //if (!selectedProduct || !selectedProduct.name || !selectedProduct.price) {
    //return <div>Loading product details...</div>;
 // }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Right Section - Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />
        <div className="flex space-x-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-1/2"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="border p-2 w-1/2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border p-2 w-1/2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border p-2 w-1/2"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
