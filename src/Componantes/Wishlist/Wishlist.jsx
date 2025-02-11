import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authContext } from '../../context/Authcontext'; 

export default function Wishlist() {
  const { userToken } = useContext(authContext);
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    if (userToken) {
      fetchProductDetails();  
    }
  }, [userToken]);


  async function fetchProductDetails() {
    try {
      const wishlistIds = [  
        "6428ead5dc1175abc65ca0ad", 
        "6428eb43dc1175abc65ca0b3", 
        "6428e884dc1175abc65ca096",
      ];
      const promises = wishlistIds.map(id => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`));
      const responses = await Promise.all(promises);
      setProducts(responses.map(response => response.data.data)); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <div>
      <h2>Your Wishlist</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
