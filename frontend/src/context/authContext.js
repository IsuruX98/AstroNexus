import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in based on the presence of JWT token in the cookie
    const jwtToken = Cookies.get("jwt");
    const userIsLoggedIn = jwtToken ? true : false;
    setIsLoggedIn(userIsLoggedIn);
    setLoading(false);

    // If user is logged in, fetch user profile
    if (userIsLoggedIn) {
      const decodedToken = jwtDecode(jwtToken);
      const userId = decodedToken.userId;
      fetchUserById(userId);
    }
  }, []);

  // Function to handle user login
  const login = async (formData) => {
    try {
      const response = await axios.post("auth/auth", formData);
      console.log("User logged in successfully:", response.data);

      // Set JWT token to cookie
      Cookies.set("jwt", response.data.token, {
        expires: 30, // Token expires in 30 days
      });

      // Update isLoggedIn state
      setIsLoggedIn(true);

      // Update user state
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error logging in:", error.response.data);
      return { success: false, error: error.response.data };
    }
  };

  // Function to handle user registration
  const register = async (formData) => {
    try {
      const response = await axios.post("auth/register", formData);
      console.log("User registered successfully:", response.data);

      // Set JWT token to cookie
      Cookies.set("jwt", response.data.token, {
        expires: 30, // Token expires in 30 days
      });

      // Update isLoggedIn state
      setIsLoggedIn(true);

      // Update user state
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      return { success: false, error: error.response.data };
    }
  };

  // Function to handle user logout
  const logout = () => {
    setIsLoggedIn(false);
    // Clear user state
    setUser(null);
    // Remove JWT token from cookie
    Cookies.remove("jwt");
  };

  // Function to fetch user profile by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`user/profile/${userId}`);
      const userData = response.data; // Assuming the response contains user data
      setUser(userData); // Update the user state with the fetched user data
    } catch (error) {
      console.error("Error fetching user profile:", error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isLoggedIn, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
