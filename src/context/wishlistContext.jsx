import { createContext, useContext, useState } from "react";
import axios from "axios";
import { authContext } from './Authcontext';

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { userToken } = useContext(authContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const [numOfFavoriteItems, setNumOfFavoriteItems] = useState(0);
  const [wishListDetails, setWishListDetails] = useState([]);


  async function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers : {
        token : userToken ,
    } })
    .then((res) => res)
    .catch((error) => error);
  }

  async function addProductToWishlist(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            productId: productId
        },
        {
            headers: {
                token : userToken ,
            }
        }).then((res) => res).catch((error) => error);

  }
  

  async function removeProductFromWishlist(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: userToken,
          },
        }
      );

      setWishlistItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.id !== productId);
        console.log("Updated wishlist after removal:", updatedItems);
        return updatedItems;
      });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  }

  return (
    <wishlistContext.Provider value={{ wishlistItems, addProductToWishlist, removeProductFromWishlist, getWishlist ,   wishListDetails,
        setWishListDetails,
        numOfFavoriteItems,
        setNumOfFavoriteItems,
        
        
         }}>
      {children}
    </wishlistContext.Provider>
  );
}
