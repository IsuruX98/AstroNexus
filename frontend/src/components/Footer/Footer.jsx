import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">AstroNexus</h2>
            <p className="text-sm">Explore the universe with AstroNexus.</p>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-white">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
        <hr className="border-gray-700 my-4" />
        <p className="text-sm text-center">
          © {new Date().getFullYear()} AstroNexus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
