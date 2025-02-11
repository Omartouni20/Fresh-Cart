import axios from "axios";
import LoaderScreen from "../LodaderScreen/LoaderScreen";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { useContext, useState } from "react";
import { cartContect } from "../../context/CartContext";
import { wishlistContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";

export default function Home() {
  const { addProductToCart } = useContext(cartContect);
  const { addProductToWishlist } = useContext(wishlistContext);
  const [wishlist, setWishlist] = useState({});

  async function handleAddtionToCart(id) {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Added to Cart", { position: "top-right" });
    } else {
      toast.error("Error adding to Cart", { position: "top-right" });
    }
  }

  async function handleAddtionToWishlist(id, event) {
    event.stopPropagation();
    event.preventDefault();
    const success = await addProductToWishlist(id);
    if (success) {
      setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
      toast.success("Added to Wishlist", { position: "top-right" });
    } else {
      toast.error("Failed to add to Wishlist", { position: "top-right" });
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });
  const allProducts = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }
  if (isError) {
    return <h1 className="text-red-800">Error Occurred</h1>;
  }

  return (
    <div className="container mx-auto mt-5">
      <HomeSlider />
      <CategoriesSlider />

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mb-9">
        {allProducts?.map((product) => (
          <div
            className="relative p-4 border rounded-lg bg-white shadow-sm transition hover:shadow-md hover:border-green-400 group"
            key={product._id}
          >
            <Link to={`/productDetails/${product.id}`} className="block">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-56 object-cover rounded-md"
              />
              <div className="mt-3">
                <h2 className="text-lg font-semibold text-green-400">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <p>{product.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-blue-600 font-bold">{product.price} EGP</p>
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-semibold">{product.ratingsAverage}</p>
                    <AiFillStar className="text-yellow-300 text-xl" />
                  </div>
                </div>
              </div>
            </Link>
            <button
              onClick={(event) => handleAddtionToWishlist(product._id, event)}
              className="mt-2 text-gray-400 hover:text-red-500 transition flex items-center  w-full"
            >
              <AiFillHeart size={24} className={wishlist[product._id] ? "text-red-500" : "text-gray-400"} />
            </button>

            <div className="mt-4 flex justify-center h-12">
              <button
                onClick={() => handleAddtionToCart(product._id)}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition opacity-0 group-hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
