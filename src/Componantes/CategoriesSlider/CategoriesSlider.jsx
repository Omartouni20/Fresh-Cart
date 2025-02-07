import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

import axios from "axios";
import { useEffect, useState } from "react";


export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 6,
        slidesToScroll: 2,
      };
      

      const [allCategories, setallCategories] = useState(null);
    
      function getAllCategories () {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then( function( response ) {
            console.log('Categories ==>', response.data.data);
        
        setallCategories(response.data.data) ;
            
        } )
        .catch( function( err ) {
            console.log('8lt', err);
            
        } )
      }
      
      useEffect(function(){
        getAllCategories();
      } , [])

  return (
<>


    


    <Slider  {...settings} autoplay>

        {allCategories?.map( function( category ) { return     <div className="mt-10 mb-5" key={category._id} >

            <img src={category.image} alt={category.name} className="w-full h-72" />
            <h3 className="text-center p-2 "> { category.name } </h3>

</div> } )}
        

  </Slider>

</>
  )
}
