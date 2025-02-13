import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { authContext } from "./Authcontext";

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { userToken } = useContext(authContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [numOfFavoriteItems, setNumOfFavoriteItems] = useState(0);

  // Fetch wishlist from API
  async function getWishlist() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: userToken,
        },
      });
      if (res.data) {
        setWishlistItems(res.data.data);
        setNumOfFavoriteItems(res.data.data.length);  
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function addProductToWishlist(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: userToken,
          },
        }
      );
      if (res.data) {
        setNumOfFavoriteItems(prev => prev + 1); 
        return true;
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      return false;
    }
  }

  async function removeProductFromWishlist(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: userToken,
        },
      });
      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId));
      setNumOfFavoriteItems((prev) => Math.max(prev - 1, 0));  
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  }

  useEffect(() => {
    if (userToken) {
      getWishlist();
    }
  }, [userToken]);

  return (
    <wishlistContext.Provider
      value={{
        wishlistItems,
        numOfFavoriteItems,
        addProductToWishlist,
        removeProductFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
