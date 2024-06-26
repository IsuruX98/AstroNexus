import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import AuthModal from "../AuthModel/AuthModel";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import UserProfileModal from "../UserProfileModal/UserProfileModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [nav, setNav] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log("user", user);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLoginModal = () => {
    setShowLogin(true);
    setShowRegister(false); // Ensure register modal is closed
  };

  const handleRegisterModal = () => {
    setShowRegister(true);
    setShowLogin(false); // Ensure login modal is closed
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowProfileModal(false);
  };

  return (
    <nav className="flex justify-between w-full py-4 lg:px-32 px-12 sticky top-0 z-[999] bg-gradient-to-r from-gray-900 to-sky-500">
      {/* Logo */}
      <div className="cursor-pointer lg:hidden">
        <Link to="/" className="text-2xl font-bold text-white">
          AstroNexus
        </Link>
      </div>

      {/* Main Navigation Links */}
      <div className="items-center hidden space-x-12 lg:flex text-white">
        <div className="flex items-center text-white">
          <h3 className="font-extrabold text-white">
            <Link to="/" spy={true} smooth={true} duration={500}>
              <div className="cursor-pointer text-2xl">AstroNexus</div>
            </Link>
          </h3>
        </div>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
            className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Services
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="py-1" role="none">
                <Link
                  to="/apd"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Astronomy Picture of the Day
                </Link>
                <Link
                  to="/mrp"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Mars Rover Photos
                </Link>
                <Link
                  to="/epic"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Earth Polychromatic Imaging Camera
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auth Links or User Profile Button */}
      <div className="items-center hidden gap-8 lg:flex text-white">
        {user ? (
          <button
            onClick={() => setShowProfileModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <AiOutlineUser />
            {user.name}
          </button>
        ) : (
          <>
            <button
              onClick={handleLoginModal}
              className="flex items-center justify-center text-white"
            >
              Sign In
            </button>
            <button
              onClick={handleRegisterModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up for Free
            </button>
          </>
        )}
      </div>

      {/* Login Modal */}
      <AuthModal isOpen={showLogin} onClose={handleCloseModal} mode="login" />

      {/* Register Modal */}
      <AuthModal
        isOpen={showRegister}
        onClose={handleCloseModal}
        mode="register"
      />

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal
          user={user}
          onClose={handleCloseModal}
          logout={logout}
        />
      )}

      {/* Mobile Navigation */}
      <div
        onClick={handleNav}
        className="flex items-center justify-center lg:hidden text-white"
      >
        <div className="">
          {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Mobile Navigation Content */}
      <div
        className={
          !nav
            ? "fixed left-[-100%] top-0 w-[60%] h-full bg-gray-900 ease-in-out duration-500 lg:hidden"
            : "fixed left-0 top-0 w-[60%] h-full ease-in-out bg-gray-900 duration-500 lg:hidden"
        }
      >
        <h1 className="font-bold m-8 text-white">
          <Link
            to="/"
            onClick={() => {
              setNav(false);
            }}
            spy={true}
            smooth={true}
            duration={500}
          >
            <h1 className="text-2xl font-bold">AstroNexus</h1>
          </Link>
        </h1>
        <ul className="p-4 mt-20 text-white">
          {/* Render the same navigation links as in large screen */}
          <li className="p-4 hover:bg-gray-800 hover:text-sky-500">
            <Link
              to="/apd"
              onClick={() => {
                setNav(false);
              }}
            >
              <div className="cursor-pointer">Astronomy Picture of the Day</div>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-800 hover:text-sky-500">
            <Link
              to="/mrp"
              onClick={() => {
                setNav(false);
              }}
            >
              <div className="cursor-pointer">Mars Rover Photos</div>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-800 hover:text-sky-500">
            <Link
              to="/epic"
              onClick={() => {
                setNav(false);
              }}
            >
              <div className="cursor-pointer">
                Earth Polychromatic Imaging Camera
              </div>
            </Link>
          </li>
          {/* Add any additional links here */}
        </ul>
        {/* Sign In and Sign Up buttons */}
        <div className="flex flex-col mx-5">
          {user ? (
            <button
              onClick={() => setShowProfileModal(true)}
              className="inline-flex mt-8 items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <AiOutlineUser />
              {user.name}
            </button>
          ) : (
            <>
              <button
                onClick={handleLoginModal}
                className="text-white mt-4 py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign In
              </button>
              <button
                onClick={handleRegisterModal}
                className="text-white mt-4 py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign Up for Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
