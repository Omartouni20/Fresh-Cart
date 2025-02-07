import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Componantes/Layout/Layout"
import Register from "./Componantes/Register/Register"
import Login from "./Componantes/Login/Login"
import Notfound from "./Componantes/Notfound/Notfound"
import Products from "./Componantes/Products/Products"
import Home from "./Componantes/Home/Home"
import Authcontextprovider from "./context/Authcontext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProductDetails from './Componantes/productDetails/productDetails';
import CartContextProvider from "./context/CartContext"
import { Toaster } from "react-hot-toast"
import Cart from './Componantes/Cart/Cart';

const router = createBrowserRouter([
  {path : '' , element : <Layout />  , children : [
    {path : '' , element : <protectedRoute> <Register /> </protectedRoute> } ,
    {path : 'register' , element : <protectedRoute> <Register /> </protectedRoute> } ,
    {path : 'cart' , element : <protectedRoute> <Cart /> </protectedRoute> } ,
    {path : 'login' , element : <protectedRoute> 
      <Login /> </protectedRoute> } ,
    {path : 'products' , element : <protectedRoute> <Products /> </protectedRoute> } ,
    {path : 'home' , element : <protectedRoute> <Home /> </protectedRoute> } ,
    {path : '*' , element :  <Notfound />} ,
    {path : 'productdetails/:id' , element : <protectedRoute> <ProductDetails /> </protectedRoute>},



  ]}
])


const client = new QueryClient();


export default function App() {
  return (

    <QueryClientProvider  client={client}>
    
    <Authcontextprovider>

    <CartContextProvider>


    <RouterProvider router={router} />
    
    <Toaster  />


    </CartContextProvider>

    
    </Authcontextprovider>


    </QueryClientProvider>
  )
}
