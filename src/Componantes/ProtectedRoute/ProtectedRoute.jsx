import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"; 
import { authContext } from "../../context/Authcontext"; 

export default function ProtectedRoute(props) {
  const { userToken } = useContext(authContext); 

  return userToken ? props.children : <Navigate to="/login" />;
}
