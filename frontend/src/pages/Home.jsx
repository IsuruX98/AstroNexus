import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    // If user is already logged in, redirect to home page
    navigate("/login");
  }

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other user details here */}
        </div>
      )}
    </div>
  );
};

export default Home;
