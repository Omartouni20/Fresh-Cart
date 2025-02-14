import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import freshLogo from '../../assets/images/freshcart-logo.svg';
import { authContext } from '../../context/Authcontext';
import { cartContect } from './../../context/CartContext';
import { wishlistContext } from '../../context/WishlistContext';  
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; 

export default function Navbar() {
  const { userToken, setToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContect);
  const { numOfFavoriteItems } = useContext(wishlistContext);  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          className="md:hidden text-gray-500 rounded-lg p-2 focus:outline-none hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 fixed top-4 right-4"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`md:flex md:items-center md:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          {userToken ? (
            <ul className="flex flex-col md:flex-row md:space-x-6 items-center">
              <li><NavLink to="home" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Home</NavLink></li>
              <li><NavLink to="products" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Products</NavLink></li>
              <li><NavLink to="brands" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Brands</NavLink></li>
              <li><NavLink to="categories" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Categories</NavLink></li>
            </ul>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Login</Link>
              <Link to="/register" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Register</Link>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0">
            <div className="flex justify-center space-x-4 md:space-x-6 items-center">
              {userToken && (
                <>
                  <Link to='/cart'>
                    <div className="relative flex items-center">
                      <i className="fa-solid fa-cart-shopping text-xl hover:text-blue-700 dark:text-gray-400"></i>
                      <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        <span className="text-white">{numberOfCartItems}</span>
                      </span>
                    </div>
                  </Link>

                  <Link to="/wishlist">
                    <div className="relative text-2xl">
                      {numOfFavoriteItems > 0 ? (
                        <AiFillHeart className="text-red-500" />
                      ) : (
                        <AiOutlineHeart className="text-gray-400" />
                      )}
                      {numOfFavoriteItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                          <span className="text-white">{numOfFavoriteItems}</span>
                        </span>
                      )}
                    </div>
                  </Link>
                </>
              )}

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-gray-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-600 hover:text-pink-600 dark:text-white dark:hover:text-pink-600 text-xl" />
              </a>
            </div>

            {userToken && (
              <p 
                onClick={handleLogOut} 
                className="cursor-pointer text-gray-600 dark:text-white text-xl text-center mt-4 md:mt-0 md:ml-4"
              >
                Logout
              </p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
