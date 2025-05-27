import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-30 ">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          TourBuilder
        </Link>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <Link
          to="/get-started"
          className="hidden md:inline-block bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
        >
          Get Started
        </Link>
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-md space-y-3">
          <Link to="/" className="block">Home</Link>
          <Link to="/features" className="block">Features</Link>
          <Link to="/pricing" className="block">Pricing</Link>
          <Link to="/about" className="block">About</Link>
          <Link
            to="/get-started"
            className="block bg-black text-white px-4 py-2 rounded-lg mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;