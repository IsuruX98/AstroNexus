import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";
import AuthModal from "../AuthModel/AuthModel";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
  };

  return (
    <nav className="flex justify-between w-full py-4 lg:px-32 px-12 sticky top-0 z-[999] bg-white">
      {/* Logo */}
      <div className="cursor-pointer lg:hidden">
        <h1 className="text-2xl font-bold text-black">SkillSprint</h1>
      </div>

      {/* Main Navigation Links */}
      <div className="items-center hidden space-x-12 lg:flex text-black">
        <div className="flex items-center text-black">
          <h3 className="font-extrabold text-black">
            <Link to="home" spy={true} smooth={true} duration={500}>
              <div className="cursor-pointer text-2xl">SkillSprint</div>
            </Link>
          </h3>
        </div>
        <input
          type="text"
          placeholder="what do you want to learn..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-64"
        />
        <Link to="Education" spy={true} smooth={true} duration={500}>
          <div className="cursor-pointer">Online Courses</div>
        </Link>
        <Link to="Skills" spy={true} smooth={true} duration={500}>
          <div className="cursor-pointer">Online Degrees</div>
        </Link>
      </div>

      {/* Auth Links */}
      <div className="items-center hidden gap-8 lg:flex text-black">
        <button
          onClick={handleLoginModal}
          className="flex items-center justify-center text-black"
        >
          Login
        </button>
        <button
          onClick={handleRegisterModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Join for Free
        </button>
      </div>

      {/* Login Modal */}
      <AuthModal isOpen={showLogin} onClose={handleCloseModal} mode="login" />

      {/* Register Modal */}
      <AuthModal
        isOpen={showRegister}
        onClose={handleCloseModal}
        mode="register"
      />

      {/* Mobile Navigation */}
      <div
        onClick={handleNav}
        className="flex items-center justify-center lg:hidden text-black"
      >
        <div className="">
          {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Mobile Navigation Content */}
      <div
        className={
          !nav
            ? "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 lg:hidden"
            : "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray ease-in-out bg-white duration-500 lg:hidden"
        }
      >
        <h1 className="font-bold m-8 text-black">
          <Link
            to="home"
            onClick={() => {
              setNav(false);
            }}
            spy={true}
            smooth={true}
            duration={500}
          >
            <h1 className="text-2xl font-bold">SkillSprint</h1>
          </Link>
        </h1>
        <ul className="p-4 mt-20 text-black">
          {/* Render the same navigation links as in large screen */}
          <li className="p-4 border-b border-gray-600 hover:text-lg hover:font-bold">
            <Link
              to="Education"
              onClick={() => {
                setNav(false);
              }}
              spy={true}
              smooth={true}
              duration={500}
            >
              <div className="cursor-pointer">Online Courses</div>
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600 hover:text-lg hover:font-bold">
            <Link
              to="Skills"
              onClick={() => {
                setNav(false);
              }}
              spy={true}
              smooth={true}
              duration={500}
            >
              <div className="cursor-pointer">Online Degrees</div>
            </Link>
          </li>
          {/* Add any additional links here */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
