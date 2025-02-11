import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import freshLogo from '../../assets/images/freshcart-logo.svg';
import { authContext } from '../../context/Authcontext';
import { cartContect } from './../../context/CartContext';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Navbar() {
  const { userToken, setToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContect);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (userToken) {
      fetchWishlist();
    }
  }, [userToken]);

  async function fetchWishlist() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: userToken },
      });
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  function handleLogOut() {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Link className="flex items-center">
            <img src={freshLogo} alt="FreshCart Logo" className="h-8" />
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-500 rounded-lg p-2 focus:outline-none hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-6">
          {userToken && (
            <ul className="flex space-x-4">
              <li><NavLink to="home" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Home</NavLink></li>
              <li><NavLink to="products" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Products</NavLink></li>
              <li><NavLink to="brands" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Brands</NavLink></li>
            </ul>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {userToken && (
            <>
              <Link to='/cart'>
                <div className="relative">
                  <i className="fa-solid fa-cart-shopping text-xl hover:text-blue-700 dark:text-gray-400"></i>
                  <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {numberOfCartItems}
                  </span>
                </div>
              </Link>

              <Link to="/wishlist">
                <div className="relative text-2xl">
                  {wishlist && wishlist.length > 0 ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400" />
                  )}
                  {wishlist && wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}

          <ul className="flex space-x-4 items-center text-lg">
            {userToken ? (
              <li><span onClick={handleLogOut} className="cursor-pointer text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Logout</span></li>
            ) : (
              <>
                <li><NavLink to="login" className="text-gray-900 hover:text-blue-700 dark:text-white">Login</NavLink></li>
                <li><NavLink to="register" className="text-gray-900 hover:text-blue-700 dark:text-white">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}