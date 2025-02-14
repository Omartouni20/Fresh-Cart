import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"; // لازم تستخدم useContext هنا
import { authContext } from "../../context/Authcontext"; // تأكد أن المسار صح

export default function ProtectedRoute() {
  const { userToken } = useContext(authContext); // استخدم useContext علشان تجيب الـ userToken

  return userToken ? <Outlet /> : <Navigate to="/login" />;
}
