import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // if (!isLoggedIn) {
  //   // If user is already logged in, redirect to home page
  //   navigate("/login");
  // }

  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
