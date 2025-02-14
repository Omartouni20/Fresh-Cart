import { useState, useEffect } from 'react';
import axios from 'axios';
import LoaderScreen from './../LodaderScreen/LoaderScreen';

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
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {brands.map((brand) => (
          <div key={brand.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <img 
              className="w-full h-40 object-cover rounded-lg transform transition duration-300 hover:scale-110"
              src={brand.image} 
              alt={brand.name} 
            />
            <div className="p-4">
              <h1 className="text-center text-xl font-medium text-gray-800">{brand.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
