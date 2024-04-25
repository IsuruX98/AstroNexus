import React, { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If confirmPassword field is being changed, validate password match in real-time
    if (name === "confirmPassword") {
      validatePasswordMatch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
      valid = false;
    } else if (!isValidMobile(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    // Check password match only if confirmPassword is not empty
    if (formData.confirmPassword.trim()) {
      validatePasswordMatch(formData.confirmPassword);
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    // Basic mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePasswordMatch = (confirmPassword) => {
    if (confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white ${
            errors.name && "border-red-500"
          }`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white ${
            errors.email && "border-red-500"
          }`}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-white"
        >
          Mobile:
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white ${
            errors.mobile && "border-red-500"
          }`}
        />
        {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white ${
            errors.password && "border-red-500"
          }`}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-white"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white ${
            errors.confirmPassword && "border-red-500"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-white text-gray-900 py-2 rounded-md"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
