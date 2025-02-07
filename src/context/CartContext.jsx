import axios from "axios";
import { createContext, useContext, useState } from "react" 
import { authContext } from './Authcontext';
import { useEffect } from "react";


export const cartContect = createContext();
export default function CartContextProvider( {children} ) {
const { userToken } = useContext(authContext)


const [numberOfCartItems, setnumberOfCartItems] = useState(0) ;
const [products, setproducts] = useState(null) ;
const [totalCartPrice, settotalCartPrice] = useState(0) ;
const [cartMessage, setcartMessage] = useState('') ;


 async function addProductToCart ( id ) {

  const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,
   {
      productId : id ,
    } , 
  {
   headers : {
    token : userToken ,
   } 
  })
  .then ( function ( res ) {
//    console.log("Res =====>" , res.data);
//    console.log("message ==>" , res.data.message);
//    console.log("numOfCartItems ==>" , res.data.numOfCartItems);
//    console.log("products==>" , res.data.data.products);
//    console.log("totalCartPrice==>" , res.data.data.totalCartPrice);
//
//    setnumberOfCartItems(res.data.numOfCartItems);
//    setproducts(res.data.data.products);
//    settotalCartPrice(res.data.data.totalCartPrice);
//    setcartMessage(res.data.message) ;
getUserCart() ;

    return true;
    
  } ) 
  .catch ( function ( err ) {
    //console.log("Error" , err);
    
    return false;
  } )



  return res ;
  } 


  function getUserCart () {
    axios.get('https://ecommerce.routemisr.com/api/v1/cart' , { 
      headers : {
        token : userToken ,
      }
     })
     .then( function ( response ) {
      //console.log('response ==> ' , response.data);
      //console.log('NumOfCartItems ==> ' , response.data.numOfCartItems);
      //console.log('Products ==> ' , response.data.data.products);
      //console.log('Total Cart Price ==> ' , response.data.data.totalCartPrice);

      setnumberOfCartItems(response.data.numOfCartItems);
      setproducts(response.data.data.products);
      settotalCartPrice(response.data.data.totalCartPrice);

      
     } )
     .catch( function ( err ) {
      console.log('error ==> ' , err);
      
     } )
  }
  useEffect( function () {
    if ( userToken ) {
      getUserCart() ;
    }
  } , [ userToken ] ) ;

async function updateCount ( id  , newCount) {

const res = await axios.put ( `https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
  count: newCount
}
,{
headers : {
  token : userToken ,
}
} )
.then( function ( res ) {
  setnumberOfCartItems(res.data.numOfCartItems);
  setproducts(res.data.data.products);
  settotalCartPrice(res.data.data.totalCartPrice);


  return true ;
} )
.catch( function ( err ) {


  return false ;
} )

return res ;
}

async function removeCartItem (id) {
 const res = await axios.delete (`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
    headers : {
      token : userToken ,
    }
  })
  .then( function ( res ) {
    setnumberOfCartItems(res.data.numOfCartItems);
    setproducts(res.data.data.products);
    settotalCartPrice(res.data.data.totalCartPrice);

    return true ;
  } )
  .catch( function ( err ) {

    return false ;
  } )

return res ;

} 

  return (
    <cartContect.Provider value={ { addProductToCart , cartMessage , getUserCart  , numberOfCartItems ,
      products ,
      totalCartPrice , updateCount, removeCartItem , } }>
    
    {children}

    </cartContect.Provider>
  )
}
