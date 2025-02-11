import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { cartContect } from './../../context/CartContext'; 

export default function Checkout() {
  const { state } = useLocation(); 
  const { userDetails } = state || {}; 
  const { cartId } = useContext(cartContect); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!userDetails || !cartId) {
    toast.error("❌ Missing user details or cart ID. Please go back and complete the form.");
    navigate('/order'); 
    return null;
  }


  async function handleCheckout() {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5176`,
        {
          shippingAddress: {
            details: userDetails.details,
            phone: userDetails.phone,
            city: userDetails.city,
          },
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
  
      if (response.data.status === "success") {
        const { url } = response.data.session;
        window.location.href = url;
      } else {
        toast.error(`❌ ${response.data.message || 'Failed to create checkout session'}`);
        console.error("Error from API:", response.data);
        navigate('/cart');
      }
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again.");
      console.error("Error details:", error);
      if (error.response) {
        console.error("API Response error:", error.response.data);
      } else {
        console.error("Error without response:", error.message);
      }
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">🛒 Checkout</h2>

        <form className="space-y-4">
          <div className="flex items-center border rounded-lg p-2 shadow-sm">
            <label className="text-gray-500 mx-2">Details:</label>
            <span className="w-full bg-transparent focus:outline-none p-2 text-gray-700">{userDetails.details}</span>
          </div>

          <div className="flex items-center border rounded-lg p-2 shadow-sm">
            <label className="text-gray-500 mx-2">Phone:</label>
            <span className="w-full bg-transparent focus:outline-none p-2 text-gray-700">{userDetails.phone}</span>
          </div>

          <div className="flex items-center border rounded-lg p-2 shadow-sm">
            <label className="text-gray-500 mx-2">City:</label>
            <span className="w-full bg-transparent focus:outline-none p-2 text-gray-700">{userDetails.city}</span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className={`w-full py-2 text-white font-medium rounded-lg bg-blue-500 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
