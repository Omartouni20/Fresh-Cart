import { useContext } from "react";
import { cartContect } from './../../context/CartContext';
import LoaderScreen from "../LodaderScreen/LoaderScreen";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const { products, totalCartPrice, updateCount, removeCartItem, setProducts, resetValues } = useContext(cartContect);

  if (!products) {
    return <LoaderScreen />;
  }

  function handleChangeCount(id, newCount) {
    updateCount(id, newCount).then(() => toast.success('Updated!')).catch(() => toast.error('Error'));
  }

  function handleDelete(id) {
    removeCartItem(id).then(() => toast.success('Removed!')).catch(() => toast.error('Error'));
  }

  function handleClearCart() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("No user token found. Please log in.");
      return;
    }
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token } })
      .then((response) => {
        if (response.data.message === "success") {
          toast.success("Cart cleared successfully");
          resetValues();
        } else {
          toast.error("Failed to clear the cart");
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">Shopping Cart</h1>
      <h2 className="text-lg font-semibold text-blue-600 bg-gray-100 p-2 rounded-md mb-4">Total: {totalCartPrice} EGP</h2>

      <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="p-2"><img src={product.product.imageCover} className="w-16 h-16 object-cover rounded-md" alt={product.product.title} /></td>
                <td className="px-4 py-2 font-medium text-gray-800">{product.product.title}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <button onClick={() => handleChangeCount(product.product._id, product.count - 1)} className="px-3 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300">-</button>
                  <span className="font-semibold text-gray-800">{product.count}</span>
                  <button onClick={() => handleChangeCount(product.product._id, product.count + 1)} className="px-3 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300">+</button>
                </td>
                <td className="px-4 py-2 font-semibold text-gray-800">{product.price} EGP</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(product.product._id)} className="text-red-500 hover:text-red-700">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleClearCart} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Clear</button>
        <Link to='/order'>
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Order</button>
        </Link>
      </div>
    </div>
  );
}
