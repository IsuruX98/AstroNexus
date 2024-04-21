import React, { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate checking if user is logged in (e.g., fetching from local storage)
    const userIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!userIsLoggedIn);
    setLoading(false);
  }, []);

  // Function to handle user login
  const login = () => {
    // Simulate login process
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const logout = () => {
    // Simulate logout process
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loading, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
