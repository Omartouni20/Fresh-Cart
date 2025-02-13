import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]); 
  const [subCategories, setSubCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        console.log('Categories Response:', response.data); 
        setCategories(response.data.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId); 
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories');
      console.log('Subcategories Response:', response.data); 
      setSubCategories(response.data.data.filter(subcategory => subcategory.category === categoryId)); 
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
          </div>
        ))}
      </div>

      {selectedCategory && subCategories.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subCategories.map((subCategory) => (
              <div key={subCategory._id} className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">{subCategory.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
