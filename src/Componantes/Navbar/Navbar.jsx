import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import freshLogo from '../../assets/images/freshcart-logo.svg';
import { authContext } from '../../context/Authcontext';
import { cartContect } from './../../context/CartContext';

export default function Navbar() {
  const { userToken, setToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContect);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogOut() {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  }

  return (
    <nav className="bg-green-400 border-b dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center">
            <img src={freshLogo} alt="FreshCart Logo" className="h-8" />
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-500 rounded-lg p-2 focus:outline-none hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <span className="sr-only">فتح القائمة</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-6">
          {userToken && (
            <ul className="flex space-x-4">
              <li><NavLink to="home" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Home</NavLink></li>
              <li><NavLink to="products" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Products</NavLink></li>
              <li><NavLink to="categories" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Categories</NavLink></li>
              <li><NavLink to="brands" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Brands</NavLink></li>
            </ul>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {userToken ? (
            <Link to='/cart'>
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-xl hover:text-blue-700 dark:text-gray-400"></i>
                <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {numberOfCartItems}
                </span>
              </div>
            </Link>
          ) : null}

          <ul className="flex space-x-4 text-lg">
            <li><i className="fa-brands fa-facebook-f cursor-pointer hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"></i></li>
            <li><i className="fa-brands fa-twitter cursor-pointer hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"></i></li>
            <li><i className="fa-brands fa-instagram cursor-pointer hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"></i></li>
            <li><i className="fa-brands fa-youtube cursor-pointer hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"></i></li>
            <li><i className="fa-brands fa-linkedin cursor-pointer hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"></i></li>
          </ul>

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

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <ul className="flex flex-col space-y-4">
            <li><NavLink to="home" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Home</NavLink></li>
            <li><NavLink to="products" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Products</NavLink></li>
            <li><NavLink to="categories" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Categories</NavLink></li>
            <li><NavLink to="cart" className="text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Cart</NavLink></li>
            {userToken ? (
              <li><span onClick={handleLogOut} className="cursor-pointer text-gray-900 hover:text-blue-700 dark:text-white text-lg font-semibold">Logout</span></li>
            ) : (
              <>
                <li><NavLink to="login" className="text-gray-900 hover:text-blue-700 dark:text-white">Login</NavLink></li>
                <li><NavLink to="register" className="text-gray-900 hover:text-blue-700 dark:text-white">Register</NavLink></li>
              </>
            )}
          </ul>

          <div className="mt-4 flex justify-center space-x-6 text-xl">
            <i className="fa-brands fa-facebook-f cursor-pointer hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"></i>
            <i className="fa-brands fa-twitter cursor-pointer hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"></i>
            <i className="fa-brands fa-instagram cursor-pointer hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"></i>
            <i className="fa-brands fa-youtube cursor-pointer hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"></i>
            <i className="fa-brands fa-linkedin cursor-pointer hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"></i>
          </div>
        </div>
      )}
    </nav>
  );
}
