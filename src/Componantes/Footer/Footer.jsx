import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-400 text-black py-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="#" className="text-black hover:text-white text-2xl">
            <FaFacebook />
          </Link>
          <Link to="#" className="text-black hover:text-white text-2xl">
            <FaTwitter />
          </Link>
          <Link to="#" className="text-black hover:text-white text-2xl">
            <FaInstagram />
          </Link>
        </div>
        <p className="text-black">&copy; {new Date().getFullYear()} Omar Sarhan. All rights reserved.</p>
      </div>
    </footer>
  );
}
