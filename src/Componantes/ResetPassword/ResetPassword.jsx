import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Email is required."),
      newPassword: yup
        .string()
        .required("New Password is required.")
        .min(6, "Password should be at least 6 characters.")
        .max(12, "Password should not exceed 12 characters."),
    }),
    onSubmit: async (values) => {
      setIsClicked(true);

      try {
        const response = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            email: values.email,
            newPassword: values.newPassword,
          }
        );

        if (response.data.token) {
          setSuccessMessage("Password reset successfully!");
          setErrorMessage(null);

          localStorage.setItem("authToken", response.data.token);

          setTimeout(() => {
            navigate("/login"); 
          }, 2000);
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Something went wrong!");
        setSuccessMessage(null);
      } finally {
        setIsClicked(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-6">Reset Password</h1>

        {successMessage && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {errorMessage}
          </div>
        )}

        {/* Email Input */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-sm text-red-800 mt-2">{formik.errors.email}</div>
          )}
        </div>

        {/* New Password Input */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="text-sm text-red-800 mt-2">{formik.errors.newPassword}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg font-medium"
        >
          {isClicked ? (
            <ThreeDots visible={true} height="20" width="40" color="#fff" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
