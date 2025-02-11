import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"
import LoaderScreen from "../LodaderScreen/LoaderScreen";
import { useContext } from "react";
import { cartContect } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function productDetails() {

   const {id} =  useParams();

   const { addProductToCart  } = useContext (cartContect) ;

  async function handleAddtionToCart () {

    const res = await addProductToCart ( id )

    if (res) {
      toast.success ("Product Added Successfuly" , { duration : 3000 , position : "top-right" })
      
      
    } else {

      toast.error ("Error" , { duration : 3000 , position :  "top-right"})
  


    }

   }

    function getProductDetails () {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

    }

    const {isError , isLoading , data} = useQuery({
        queryKey : ['productDetails' , id],
        queryFn : getProductDetails,
    });

    if (isError) {
        return <h1>No Product Found</h1>
    }

    if (isLoading) {
        return <LoaderScreen />
    }

    const productDetailsObj = data?.data.data; 

  return (
    <>
    
    <div className="container mx-auto flex items-center justify-center gap-10 py-10">
  <div className="w-1/4">
    <img src={productDetailsObj.imageCover} className="w-full rounded-lg " alt={productDetailsObj.title} />
  </div>

  <div className="w-2/4 text-center">
    <h1 className="text-2xl font-bold mb-4">{productDetailsObj.title}</h1>
    <p className="text-gray-700 mb-4">{productDetailsObj.description}</p>
    <h5 className="text-lg font-semibold">Price: <span className="text-green-400">{productDetailsObj.price}</span></h5>
    <h5 className="text-lg font-semibold">Quantity: <span className="text-blue-400">{productDetailsObj.quantity}</span></h5>
    <button onClick={handleAddtionToCart}  className="w-full bg-green-400 text-white hover:bg-blue-400  font-bold py-3 rounded-lg mt-3 shadow-md transition duration-300">
       + Add To Cart
      </button>
  </div>
</div>


    </>
  )
}
