import { useContext, useEffect, useState } from 'react';
import { wishlistContext } from './../../context/wishlistContext';
import { cartContect } from './../../context/CartContext';
import { toast } from 'react-hot-toast';
import LoaderScreen from './../LodaderScreen/LoaderScreen';

export default function Wishlist() {
  const { wishlistItems, removeProductFromWishlist, getWishlist } = useContext(wishlistContext);
  const { addProductToCart, getUserCart } = useContext(cartContect);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      await getWishlist();
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  if (!wishlistItems.length) {
    return (
      <div className="flex justify-center items-center h-full text-gray-600 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3 mt-11">Your Wishlist is Empty</h2>
          <p className="text-sm">Start adding products to your wishlist to see them here!</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (productId) => {
    const success = await addProductToCart(productId);
    if (success) {
      toast.success("Product added to cart successfully ✅");
      getUserCart();
    } else {
      toast.error("Error adding product ❌");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">Your Wishlist</h1>
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Product</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 hidden sm:table-cell">Price</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="px-6 py-3 flex items-center">
                <img src={product.imageCover} alt={product.title} className="w-16 h-16 object-cover rounded-md mr-4" />
                <span className="text-gray-800">{product.title}</span>
              </td>
              <td className="px-6 py-3 text-gray-600 hidden sm:table-cell">{product.price} EGP</td>
              <td className="px-6 py-3 flex space-x-2">
                <button
                  onClick={() => removeProductFromWishlist(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
