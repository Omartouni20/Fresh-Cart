import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import image1 from '../../assets/images/banner-4.jpeg'
import image2 from '../../assets/images/slider-image-2.jpeg'
import image3 from '../../assets/images/slider-image-3.jpeg'
import image4 from '../../assets/images/grocery-banner-2.jpeg'
import image5 from '../../assets/images/slider-image-1.jpeg'




export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (

    <div className="px-5 flex">
<div className="w-3/4">      
    <Slider  {...settings} autoplay>
        
        <div >
        <img className="w-full h-72" src={image1} alt="" />
      </div>
        <div >
        <img className="w-full h-72" src={image2} alt="" />
  
      </div>
        <div >
        <img className="w-full h-72" src={image3} alt="" />
  
      </div>
        <div >
        <img className="w-full h-72" src={image4} alt="" />
  
      </div>
        <div >
        <img className="w-full h-72" src={image5} alt="" />
  
      </div>
  
      </Slider>
      </div>

      <div className="w-1/4 "> 
         <img src={image5} alt="" className="w-full h-36  block "  />
        <img src={image4} alt="" className="w-full h-36 block" />

      </div>
    </div>
  );
}