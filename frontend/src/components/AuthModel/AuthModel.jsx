import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { AiOutlineClose } from "react-icons/ai";

const AuthModal = ({ isOpen, onClose, mode }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const { register, login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "", // New state for confirm password
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login(formData);
        if (response.success) {
          console.log(response);
        } else {
          console.error("Login failed:", response.error);
        }
      } else {
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
          console.error("Passwords do not match");
          return;
        }

        const response = await register(formData);
        if (response.success) {
          console.log(response);
        } else {
          console.error("Register failed:", response.error);
        }
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">
                  {isLogin ? "Login" : "Register"}
                </h2>
                <button onClick={onClose}>
                  <AiOutlineClose />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-black"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                {!isLogin && (
                  <div className="mb-4">
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-black"
                    >
                      Mobile:
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                {!isLogin && (
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-black"
                    >
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md"
                >
                  {isLogin ? "Login" : "Register"}
                </button>
              </form>
            </div>
            <p className="text-black mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={handleToggle}
                className="text-black ml-1 underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
