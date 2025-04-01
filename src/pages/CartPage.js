import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const shippingPrice = 20.00; // Ensure consistency with Checkout Page
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = (totalPrice + shippingPrice).toFixed(2); // Fix floating-point issue

  const handleCheckout = () => {
    navigate("/checkout", { state: { grandTotal, shippingPrice } }); // Pass total and shipping
  };

  return (
    <div className="flex p-6 gap-6 min-h-screen bg-gray-100">
      {/* Left Side - Cart Items */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="border px-3 py-1">-</button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="border px-3 py-1">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 text-2xl">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Summary */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg relative">
        <button onClick={() => navigate("/")} className="absolute top-4 right-4 text-2xl text-gray-500">×</button>
        <h2 className="text-xl font-bold mb-4">Total Summary</h2>
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg mt-2">
          <span>Shipping</span>
          <span>${shippingPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Grand Total</span>
          <span>${grandTotal}</span>
        </div>
        <button onClick={handleCheckout} className="bg-black text-white w-full mt-6 py-3 rounded-lg shadow-md">Checkout</button>
        <p className="text-center text-gray-500 mt-4">---- or ----</p>
        <button onClick={() => navigate("/products")} className="text-black w-full mt-2 py-2 font-semibold">&lt; Continue Shopping</button>
      </div>
    </div>
  );
};

export default CartPage;
