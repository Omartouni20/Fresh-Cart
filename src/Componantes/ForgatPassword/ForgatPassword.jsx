import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  async function handleForgetPassword(values) {
    setIsClicked(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        console.log("Success:", res.data);
        setSuccessMessage("Check your email for password reset instructions.");
        setErrorMessage(null);

        // 🔥 التوجيه بعد نجاح العملية بـ 2 ثانية
        setTimeout(() => {
          navigate("/reset-code");
        }, 2000);
      })
      .catch((err) => {
        console.log("Error:", err);
        setErrorMessage(err.response?.data?.message || "Something went wrong!");
        setSuccessMessage(null);
      })
      .finally(() => {
        setIsClicked(false);
        setTimeout(() => {
          setErrorMessage(null);
          setSuccessMessage(null);
        }, 5000);
      });
  }

  const forgetPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email Required").email("Invalid Email"),
    }),
    onSubmit: handleForgetPassword,
  });

  return (
    <form className="max-w-md mx-auto p-5" onSubmit={forgetPasswordFormik.handleSubmit}>
      <h1 className="text-center p-4">Forget Password?</h1>

      {successMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          value={forgetPasswordFormik.values.email}
          onBlur={forgetPasswordFormik.handleBlur}
          onChange={forgetPasswordFormik.handleChange}
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>

        {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {forgetPasswordFormik.errors.email}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {!isClicked ? "Send Reset Link" : <ThreeDots visible={true} height="20" width="40" color="#fff" />}
      </button>
    </form>
  );
}
