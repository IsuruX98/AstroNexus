import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "../../api/axios";

const UserProfileModal = ({ user, onClose, logout }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`user/profile/${user._id}`, {
        name,
        email,
        mobile,
      });
      console.log("User updated successfully:", response.data);
      setEditable(false);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error.response.data);
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      onClose();
    } catch (error) {
      console.error("Error logging out:", error.response.data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-8 rounded-lg w-96">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4 text-white">User Profile</h2>
            <button onClick={onClose}>
              <AiOutlineClose className="text-white" />
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="text-white block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="rounded-md p-2 w-full bg-gray-800 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editable}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="rounded-md p-2 w-full bg-gray-800 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editable}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="text-white block mb-1">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                className="rounded-md p-2 w-full bg-gray-800 text-white"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={!editable}
              />
            </div>
            <div className="flex justify-between">
              {!editable ? (
                <button
                  onClick={() => setEditable(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Submit Update
                </button>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;