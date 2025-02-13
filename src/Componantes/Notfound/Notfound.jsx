import { Link } from "react-router-dom";
import errorImage from "../../assets/images/error.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <img src={errorImage} alt="Not Found" className="w-2/3 max-w-xl mb-6" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
      <Link
        to="/home"
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
