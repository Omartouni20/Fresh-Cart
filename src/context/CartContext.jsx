import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { authContext } from './Authcontext';

export const cartContect = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(authContext);

  const [numberOfCartItems, setnumberOfCartItems] = useState(0);
  const [products, setproducts] = useState([]); 
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cartId, setcartId] = useState(null);
  const [cartCleared, setCartCleared] = useState(false); 

  // Add product to cart
  async function addProductToCart(id) {
    try {
      console.log("Adding product to cart, productId:", id);  
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: id },
        {
          headers: {
            token: userToken,
          },
        }
      );
      if (res) {
        console.log("Product added successfully:", res.data);  
        setcartId(res.data.cartId);
        getUserCart();
        return true;
      } else {
        console.log("Failed to add product: No response data.");  
        return false;
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);  
      return false;
    }
  }

  // Get user cart
  function getUserCart() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: userToken,
        },
      })
      .then(function (response) {
        console.log("User cart data:", response.data);  
        setnumberOfCartItems(response.data.numOfCartItems);
        setproducts(response.data.data.products);
        settotalCartPrice(response.data.data.totalCartPrice);
        setcartId(response.data.cartId);
      })
      .catch(function (err) {
        console.log('Error fetching cart:', err);  
      });
  }

  // Update product count
  async function updateCount(id, newCount) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        {
          headers: {
            token: userToken,
          },
        }
      );
      if (res) {
        console.log("Product count updated:", res.data); 
        setnumberOfCartItems(res.data.numOfCartItems);
        setproducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);
        return true;
      } else {
        console.log("Failed to update count: No response data.");  
        return false;
      }
    } catch (error) {
      console.error("Error updating product count:", error); 
      return false;
    }
  }

  // Remove item from cart
  async function removeCartItem(id) {
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: userToken,
        },
      });
      if (res) {
        console.log("Product removed from cart:", res.data);  
        setnumberOfCartItems(res.data.numOfCartItems);
        setproducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);
        return true;
      } else {
        console.log("Failed to remove product: No response data.");  
        return false;
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);  
      return false;
    }
  }

  // Reset cart values (clearing the cart)
  function resetValues() {
    console.log("Resetting cart values");  
    setcartId(null);
    setproducts([]);  
    settotalCartPrice(0);
    setCartCleared(true); 
  }

  // Automatically reset cartCleared state to false when cart is refilled
  useEffect(() => {
    if (cartCleared) {
      // Reset cartCleared state after resetting the cart
      setCartCleared(false);
      setnumberOfCartItems(0);
      console.log("Cart cleared and reset values.");  
    }
  }, [cartCleared]);

  return (
    <cartContect.Provider
      value={{
        addProductToCart,
        getUserCart,
        numberOfCartItems,
        products,
        setproducts,
        totalCartPrice,
        updateCount,
        removeCartItem,
        cartId,
        resetValues,
        setnumberOfCartItems,
      }}
    >
      {children}
    </cartContect.Provider>
  );
}
