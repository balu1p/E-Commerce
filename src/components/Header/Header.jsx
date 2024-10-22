import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons
import Logo from "../../assets/Logo/Logo_with_Glow-.png"; // Adjust path to your logo
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    navigate(`/product/filter?search=${searchText}`);
  };

  return (
    <>
      <header className="bg-white shadow-md p-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
        {/* Left Section: Logo */}
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="NeoSao" className="h-10 w-auto" />
            <p className="text-lg ">NEOSAO</p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-44">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <button onClick={handleSearch} className="bg-[#324C85] py-1 px-3 mx-2 text-white rounded-lg ">search</button>
        </div>

        {/* Desktop Menu Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link to="/" className="hover:text-[#324C85] transition">
            Home
          </Link>
          <Link
            to="/product/wishlist"
            className="hover:text-[#324C85] transition"
          >
            <FaRegHeart className="text-2xl" />
          </Link>
          <Link
            to="/product/wishlist"
            className="hover:text-[#324C85] transition"
          >
            <CgProfile className="text-2xl" />
          </Link>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <AiOutlineClose size={28} className="text-[#324C85]" />
            ) : (
              <AiOutlineMenu size={28} className="text-[#324C85]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div
            className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden 
                transition-all duration-300 ease-in-out 
                transform origin-top scale-y-100 opacity-100 
                animate-slide-down`}
          >
            <ul className="flex flex-col items-end space-y-2 p-4 text-gray-700 w-full text-end rounded-md">
              <Link to="/">
                <li className="w-full hover:bg-gray-200 active:bg-gray-200 transition">
                  <p className="block w-full p-2 hover:text-[#324C85]">Home</p>
                </li>
              </Link>
              <Link to="/product/wishlist">
                <li className="w-full hover:bg-gray-200 active:bg-gray-200 transition">
                  <p className="block w-full p-2 hover:text-[#324C85]">
                    Wishlist
                  </p>
                </li>
              </Link>
              <li className="w-full hover:bg-gray-200 active:bg-gray-200 transition">
                <a href="#" className="block w-full p-2 hover:text-[#324C85]">
                  Login/Signup
                </a>
              </li>
            </ul>

            {/* Mobile Search Bar */}
            <div className="px-4 mb-2">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#324C85] transition"
              />
            </div>
            <button onClick={handleSearch} className="bg-[#324C85] py-1 px-3 mx-2 text-white rounded-lg mb-2">search</button>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
