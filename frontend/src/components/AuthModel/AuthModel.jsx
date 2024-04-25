import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { AiOutlineClose } from "react-icons/ai";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../notifications/notifications";

const AuthModal = ({ isOpen, onClose, mode }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const { register, login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
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
          SuccessNotification("Logged in successfully");
          onClose();
        } else {
          ErrorNotification(response.error);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          ErrorNotification("Passwords do not match");
          return;
        }
        const response = await register(formData);
        if (response.success) {
          SuccessNotification("Registered successfully");
          onClose();
        } else {
          ErrorNotification(response.error);
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
          <div className="bg-gray-900 p-8 rounded-lg w-96">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {isLogin ? "Login" : "Register"}
                </h2>
                <button onClick={onClose}>
                  <AiOutlineClose className="text-white" />
                </button>
              </div>

              {isLogin ? (
                <LoginForm
                  onSubmit={handleSubmit}
                  formData={formData}
                  onChange={handleChange}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleSubmit}
                  formData={formData}
                  onChange={handleChange}
                />
              )}

              <p className="text-white mt-4">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={handleToggle}
                  className="text-white ml-1 underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
