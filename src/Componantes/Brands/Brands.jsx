import  { useState, useEffect } from 'react';
import axios from 'axios';
import LoaderScreen from '../LodaderScreen/LoaderScreen.jsx';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        if (res?.data?.data) {
          setBrands(res.data.data);  
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setIsLoading(false);  
      }
    }
    fetchBrands();
  }, []);  

  
  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">

      {brands.map((brand) => (
        <div key={brand.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <img className="w-full h-40 object-cover" src={brand.image} alt={brand.name} />
          <div className="p-4">
            <h1 className="text-center text-xl font-medium text-gray-800">{brand.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );}