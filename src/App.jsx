import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Componantes/Layout/Layout";
import Register from "./Componantes/Register/Register";
import Login from "./Componantes/Login/Login";
import Notfound from "./Componantes/Notfound/Notfound";
import Products from "./Componantes/Products/Products";
import Home from "./Componantes/Home/Home";
import Authcontextprovider from "./context/Authcontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from './Componantes/productDetails/productDetails';
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from './Componantes/Cart/Cart';
import Order from './Componantes/Order/Order';
import Brands from "./Componantes/Brands/Brands";
import ForgetPassword from "./Componantes/ForgatPassword/ForgatPassword";
import ResetCode from "./Componantes/ResetCode/ResetCode";
import ResetPassword from "./Componantes/ResetPassword/ResetPassword";
import ChangePassword from "./Componantes/ChangePassword/ChangePassword";
import Checkout from './Componantes/Checkout/Checkout';
import Wishlist from './Componantes/Wishlist/Wishlist';
import WishlistContextProvider from "./context/WishlistContext";
import Categories from './Componantes/Categories/Categories';

const router = createHashRouter(
  [
    { 
      path: '', 
      element: <Layout />, 
      children: [
        { path: '', element: <protectedRoute> <Login /> </protectedRoute> },
        { path: 'register', element: <protectedRoute> <Register /> </protectedRoute> },
        { path: 'cart', element: <protectedRoute> <Cart /> </protectedRoute> },
        { path: '/order', element: <protectedRoute> <Order /> </protectedRoute> },
        { path: '/checkout', element: <protectedRoute> <Checkout /> </protectedRoute> },
        { path: '/wishlist', element: <protectedRoute> <Wishlist /> </protectedRoute> },
        { path: '/categories', element: <protectedRoute> <Categories /> </protectedRoute> },
        { path: 'login', element: <protectedRoute> <Login /> </protectedRoute> },
        { path: 'products', element: <protectedRoute> <Products /> </protectedRoute> },
        { path: 'brands', element: <protectedRoute> <Brands /> </protectedRoute> },
        { path: 'forget-password', element: <protectedRoute> <ForgetPassword /> </protectedRoute> },
        { path: '/reset-code', element: <protectedRoute> <ResetCode /> </protectedRoute> },
        { path: '/reset-password', element: <protectedRoute> <ResetPassword /> </protectedRoute> },
        { path: '/change-password', element: <protectedRoute> <ChangePassword /> </protectedRoute> },
        { path: '/home', element: <protectedRoute> <Home /> </protectedRoute> },
        { path: '*', element: <Notfound /> },
        { path: 'productdetails/:id', element: <protectedRoute> <ProductDetails /> </protectedRoute> }
      ] 
    }
  ]
);

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Authcontextprovider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </WishlistContextProvider>
        </CartContextProvider>
      </Authcontextprovider>
    </QueryClientProvider>
  );
}
