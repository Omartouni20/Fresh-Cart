import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { cartContect } from './../../context/CartContext';
import toast from "react-hot-toast";
import LoaderScreen from "../LodaderScreen/LoaderScreen";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [wishlist, setWishlist] = useState({});

  const { addProductToCart } = useContext(cartContect);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${selectedCategory}/subcategories`)
        .then((response) => {
          setSubCategories(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    }
  }, [selectedCategory]);

  function getAllProducts() {
    let url = "https://ecommerce.routemisr.com/api/v1/products";
    const params = [];

    if (selectedCategory) params.push(`category[in]=${encodeURIComponent(selectedCategory)}`);
    if (selectedSubCategory) params.push(`subcategory[in]=${encodeURIComponent(selectedSubCategory)}`);
    if (sortOption) params.push(`sort=${encodeURIComponent(sortOption)}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    return axios.get(url);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getAllProducts", selectedCategory, selectedSubCategory, sortOption],
    queryFn: getAllProducts,
  });

  const allProducts = data?.data.data;

  const handleAddtionToCart = async (id) => {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Product Added Successfully", { position: "top-right" });
    } else {
      toast.error("Failed to Add Product", { position: "top-right" });
    }
  };

  const handleAddtionToWishlist = (id, event) => {
    event.preventDefault();
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [id]: !prevWishlist[id],
    }));
    if (!wishlist[id]) {
      toast.success("Added to Wishlist", { position: "top-right" });
    } else {
      toast.error("Removed from Wishlist", { position: "top-right" });
    }
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <h1 className="text-center text-red-800 text-2xl">Error Occurred</h1>;
  }

  return (
    <div className="container mx-auto mt-20">
      <div className="flex gap-5 mb-8 bg-white p-3 rounded-md shadow-md mt-5   top-5  z-50">
        <select
          className="border p-2 rounded-lg w-1/3"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded-lg w-1/3"
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          value={selectedSubCategory}
        >
          <option value="">All Subcategories</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded-lg w-1/3"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="">Sort by</option>
          <option value="priceAsc">Price Ascending</option>
          <option value="priceDesc">Price Descending</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mb-9 mt-24">
        {allProducts?.map((product) => (
          <div key={product._id} className="relative p-4 border rounded-lg bg-white shadow-sm transition hover:shadow-md hover:border-green-400 group">
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
              className="absolute top-2 right-2"
            >
              <AiFillHeart size={24} className={wishlist[product._id] ? "text-red-500" : "text-gray-400"} />
            </button>
            <button
              onClick={() => handleAddtionToCart(product._id)}
              className="absolute top-2 left-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
