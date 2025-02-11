import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-green-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/home" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
        Go to Homepage
      </Link>
    </div>
  );
}
