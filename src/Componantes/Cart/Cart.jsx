import { useContext } from "react";
import { cartContect } from './../../context/CartContext';
import LoaderScreen from "../LodaderScreen/LoaderScreen";
import toast from "react-hot-toast";

export default function Cart() {
  const { products, totalCartPrice, updateCount, removeCartItem } = useContext(cartContect);

  if (!products) {
    return <LoaderScreen />;
  }

  async function handleChangeCount(id, newCount) {
    const res = await updateCount(id, newCount);
    res ? toast.success('Updated!', { position: 'top-right' }) : toast.error('Error', { position: 'top-right' });
  }

  async function handleDelete(id) {
    const res = await removeCartItem(id);
    res ? toast.success('Removed!', { position: 'top-right' }) : toast.error('Error', { position: 'top-right' });
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Shopping Cart</h1>
      <h2 className="text-xl font-semibold text--700 dark:text-gray-300 mb-6">Total Price: {totalCartPrice} EGP</h2>
      
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="bg-white dark:bg-gray-900 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4"><img src={product.product.imageCover} className="w-20 h-20 object-cover rounded-lg" alt={product.product.title} /></td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.product.title}</td>
                <td className="px-6 py-4 flex items-center">
                  <button onClick={() => handleChangeCount(product.product._id, product.count - 1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="mx-3 font-semibold text-lg">{product.count}</span>
                  <button onClick={() => handleChangeCount(product.product._id, product.count + 1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(product.product._id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-medium">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

