import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {

  const API = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`${API}/api/user/update`, user, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => alert("Profile Updated ✅"))
    .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-100 to-gray-200">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Profile 👤
        </h2>

        {/* ID */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">User ID</label>
          <input
            type="text"
            value={user.id}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            type="text"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Update Profile
        </button>

      </div>
    </div>
  );
};

export default UserProfile;