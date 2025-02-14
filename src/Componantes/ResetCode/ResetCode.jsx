import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function ResetCode() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: yup.object({
      resetCode: yup.string().required("Reset Code is required."),
    }),
    onSubmit: (values) => {
      setIsClicked(true);

      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
          resetCode: values.resetCode,
        })
        .then((response) => {
          if (response.data.status === "Success") {
            setSuccessMessage("Code verified successfully!");
            setErrorMessage(null);
            setTimeout(() => {
              navigate("/reset-password", { state: { resetCode: values.resetCode } });
            }, 2000);
          } else {
            setErrorMessage("Invalid reset code, please check your code.");
            setSuccessMessage(null);
          }
        })
        .catch((err) => {
          setErrorMessage(err.response?.data?.message || "Something went wrong, please try again.");
          setSuccessMessage(null);
        })
        .finally(() => {
          setIsClicked(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-5">
      <h1 className="text-center p-4">Verify Reset Code</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
          {errorMessage}
        </div>
      )}

      {/* Reset Code Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="resetCode"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="resetCode"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Reset Code
        </label>
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {formik.errors.resetCode}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        disabled={isClicked}
      >
        {isClicked ? (
          "Verifying..."
        ) : (
          "Verify Code"
        )}
      </button>
    </form>
  );
}
