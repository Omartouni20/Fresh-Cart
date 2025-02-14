import { createHashRouter, RouterProvider } from "react-router-dom";
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
import ProtectedRoute from './Componantes/ProtectedRoute/ProtectedRoute'; 
const router = createHashRouter(
  [
    { 
      path: '', 
      element: <Layout />, 
      children: [
        { path: '', element: <ProtectedRoute> <Login /> </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: 'order', element: <ProtectedRoute> <Order /> </ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute> <Checkout /> </ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: 'login', element: <ProtectedRoute> <Login /> </ProtectedRoute> },
        { path: 'register', element: <ProtectedRoute> <Register /> </ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: 'forget-password', element: <ProtectedRoute> <ForgetPassword /> </ProtectedRoute> },
        { path: 'reset-code', element: <ProtectedRoute> <ResetCode /> </ProtectedRoute> },
        { path: 'reset-password', element: <ProtectedRoute> <ResetPassword /> </ProtectedRoute> },
        { path: 'change-password', element: <ProtectedRoute> <ChangePassword /> </ProtectedRoute> },
        { path: 'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: '*', element: <Notfound /> },
        { path: 'productdetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> }
      ] 
    }
  ],
  { basename: '/Fresh-Cart' }  
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
