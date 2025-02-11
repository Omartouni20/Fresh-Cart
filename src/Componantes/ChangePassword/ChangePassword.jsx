import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

export default function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        {
          headers: {
            token: token, 
          },
        }
      );

      if (response.data) {
        setSuccessMessage("Data updated successfully!");
        setErrorMessage(null);

        setTimeout(() => {
          navigate("/home"); 
        }, 2000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong!");
      setSuccessMessage(null);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5">
      <h1 className="text-center p-4">Change Your Information</h1>

      {successMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
          {errorMessage}
        </div>
      )}

      {/* Name Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      {/* Email Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
      </div>

      {/* Phone Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        {isClicked ? (
          <ThreeDots visible={true} height="20" width="40" color="#fff" />
        ) : (
          "Update Information"
        )}
      </button>
    </form>
  );
}
