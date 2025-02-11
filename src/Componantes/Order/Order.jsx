import { useContext, useState } from "react";
import { cartContect } from './../../context/CartContext';
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaCity } from "react-icons/fa";

export default function Order() {
  const { cartId, resetValues, setnumberOfCartItems } = useContext(cartContect);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    details: "",
    phone: "",
    city: ""
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  }

  function handlePayVisa() {
    if (!userDetails.details || !userDetails.phone || !userDetails.city) {
      alert("Please fill in all the fields.");
      return;
    }

    navigate('/checkout', { state: { userDetails } });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">🛒 Place Your Order</h2>

        <form className="space-y-4">
          <div className="flex items-center border rounded-lg p-2 shadow-sm">
            <FaUser className="text-gray-500 mx-2" />
            <input
              type="text"
              name="details"
              value={userDetails.details}
              onChange={handleChange}
              placeholder="Your Details"
              className="w-full bg-transparent focus:outline-none p-2 text-gray-700"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg p-2 shadow-sm">
            <FaPhone className="text-gray-500 mx-2" />
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className="w-full bg-transparent focus:outline-none p-2 text-gray-700"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg p-2 shadow-sm">
            <FaCity className="text-gray-500 mx-2" />
            <input
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleChange}
              placeholder="Your City"
              className="w-full bg-transparent focus:outline-none p-2 text-gray-700"
              required
            />
          </div>

          <button
            type="button"
            onClick={handlePayVisa}
            className={`w-full py-2 text-white font-medium rounded-lg bg-blue-500 hover:bg-blue-700`}
          >
            Pay Visa
          </button>
        </form>
      </div>
    </div>
  );
}
