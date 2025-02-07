import axios from "axios"
//import { useEffect, useState } from "react";
import LoaderScreen from "../LodaderScreen/LoaderScreen";
import HomeSlider from './../HomeSlider/HomeSlider';
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useContext } from "react";
//import Products from './../Products/Products';
import { cartContect } from './../../context/CartContext';
import toast from "react-hot-toast";


export default function Home() {
//
//  const [allProducts, setallProducts] = useState([]) ;
//  const [isLoading, setisLoading] = useState(false);
//
// async function getAllProducts () {
//
//    setisLoading(true) ;
//
//
//    axios.get('https://ecommerce.routemisr.com/api/v1/products')
//    .then( function( respnse ) {
//      console.log('s7' , respnse.data.data);
//      setallProducts(respnse.data.data) ;
//      console.log('ALl Products ==> ',allProducts);
//      setisLoading(false);
//      
//      
//    } )
//    .catch( function( err ) {
//      console.log('error', err);
//      setisLoading(false);
//      
//    } )
//
//  }
//
//useEffect( function (  ) {
//
//  getAllProducts(); 
//
//} , [] )



const { addProductToCart , cartMessage } = useContext (cartContect) ;

async function handleAddtionToCart (id) {
 const res = await addProductToCart (id)

if ( res ) {

toast.success(cartMessage , { position : "top-right" });

} else {

  toast.success(cartMessage , { position : "top-right" });


}

}



function getAllProducts () {
 return axios.get('https://ecommerce.routemisr.com/api/v1/products') ;
}

const { data , isError  , isLoading } = useQuery( { 

  queryKey : ['getAllProducts'] ,
  queryFn : getAllProducts ,

 } )
 const allProducts = data?.data.data ;



 if (isLoading) {

  return <LoaderScreen /> ;

 }

 if (isError) {

  return <h1 className="text-red-800">Error Occuerd</h1> ;

 }




  return (


    <div>
      

  <div className="container mx-auto mt-5">

  <div className="flex flex-col">

  <HomeSlider />

  <CategoriesSlider />

  </div>


   
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 mb-9">
     

     {/*{allProducts?.map ( function( product ) { return <Link to={`/productDetails/${product.id}`} key={product._id} className="bg-blue-50 rounded">

<img src={product.imageCover} alt={product.title} className="w-full" />

<span className="text-green-400 bold">{product.category.name}</span>

<h2>{product.title.split(' ').slice(0,2).join(' ')}</h2>


<p>{product.id}</p>

<div className="flex justify-between items-center mt-3">


  <p>{product.price} EGP</p>


  <p>{product.ratingsAverage}</p>

  
</div>

</Link> } )}*/}

{allProducts?.map((product) => (

<>

<div className="relative group p-1 border border-green-400 rounded-lg mt-11">
  <Link
    to={`/productDetails/${product.id}`}
    key={product._id}
    className="block"
  >
    <img src={product.imageCover} alt={product.title} className="w-full rounded-lg" />
    <span className="text-green-400 font-bold block mt-2">{product.category.name}</span>
    <h2 className="text-lg font-semibold mt-1">
      {product.title.split(' ').slice(0, 2).join(' ')}
    </h2>
    <p className="text-gray-500 text-sm">{product.id}</p>

    <div className="flex justify-between items-center mt-3 relative z-10">
      <p className="text-lg font-bold text-blue-600">{product.price} EGP</p>
      <div className="flex items-center gap-1">
        <p className="text-lg font-semibold">{product.ratingsAverage}</p>
        <AiFillStar className="text-yellow-300 text-xl" />
      </div>
    </div>
  </Link>

  <div className="absolute bottom-[-40px] left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
    <button
      onClick={(e) => {
        e.preventDefault();
        handleAddtionToCart(product._id);
      }}
      className="bg-green-400 text-white font-semibold py-1 px-4 rounded-lg mb-2"
    >
      Add
    </button>
  </div>
</div>
</>


))}




    </div>  


    </div>

    </div>
  )
}
