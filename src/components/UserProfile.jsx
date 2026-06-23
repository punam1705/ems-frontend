


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    joiningDate: "",
  salary: ""
  });

  const [leave, setLeave] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    status: "PENDING",
  });

const [projects, setProjects] = useState([]);
useEffect(() => {
  axios.get(`${API}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    setUser(res.data);

    return axios.get(
      `${API}/api/projects/employee/${res.data.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  })
  .then(res => setProjects(res.data))
  .catch(err => console.log(err));

}, []);

  // useEffect(() => {
  //   axios
  //     .get(`${API}/api/user/me`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => setUser(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      name: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/api/user/update`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile Updated ✅");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeaveChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();

    const leaveRequest = {
      employeeName: user.name,
      employeeEmail: user.email,
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      reason: leave.reason,
      status: "PENDING",
    };

    try {
      await axios.post(`${API}/api/leave-request`, leaveRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Leave Request Sent ✅");

      setLeave({
        fromDate: "",
        toDate: "",
        reason: "",
        status: "PENDING",
      });
    } catch (err) {
      console.error(err);
    }
  };
return (
  <div className="min-h-screen bg-gray-100 py-8 px-4">

    {/* Top Button */}
    <div className="max-w-7xl mx-auto flex justify-end mb-6">
      <button
        onClick={() => navigate("/my-leaves")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md font-medium transition"
      >
        📋 My Leave Requests
      </button>
    </div>

    <div className="max-w-7xl mx-auto">

      {/* Top Section */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            👤 My Profile
          </h2>

          <div className="mb-5">
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              value={user.name}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-xl"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm text-gray-500">Joining Date</label>
            <input
              type="date"
              value={user.joiningDate || ""}
              disabled
              className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
            />
          </div>

          <div className="mb-8">
            <label className="text-sm text-gray-500">Salary</label>
            <input
              type="text"
              value={user.salary ? `₹ ${user.salary}` : ""}
              disabled
              className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Update Profile
          </button>
        </div>

        {/* Leave Request Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            📅 Leave Request
          </h2>

          <form onSubmit={handleLeaveSubmit}>

            <div className="mb-5">
              <label className="text-sm text-gray-500">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={leave.fromDate}
                onChange={handleLeaveChange}
                className="w-full mt-2 px-4 py-3 border rounded-xl"
              />
            </div>

            <div className="mb-5">
              <label className="text-sm text-gray-500">To Date</label>
              <input
                type="date"
                name="toDate"
                value={leave.toDate}
                onChange={handleLeaveChange}
                className="w-full mt-2 px-4 py-3 border rounded-xl"
              />
            </div>

            <div className="mb-5">
              <label className="text-sm text-gray-500">Reason</label>
              <textarea
                rows="5"
                name="reason"
                value={leave.reason}
                onChange={handleLeaveChange}
                className="w-full mt-2 px-4 py-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              Send Leave Request
            </button>

          </form>
        </div>

      </div>

      {/* Assigned Projects */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🚀 Assigned Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">
            No Project Assigned
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {projects.map((project) => (

              <div
                key={project.id}
                className="border rounded-xl p-5 bg-gray-50"
              >

                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  {project.projectName}
                </h3>

                <p><b>Department:</b> {project.department}</p>
                <p><b>Role:</b> {project.roleAssigned}</p>
                <p><b>Start Date:</b> {project.startDate}</p>
                <p><b>Completion Date:</b> {project.completionDate}</p>

                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm
                    ${
                      project.status === "COMPLETED"
                        ? "bg-green-600"
                        : project.status === "ON_HOLD"
                        ? "bg-yellow-500"
                        : "bg-blue-600"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>

  </div>
);
//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">

//       {/* Top Button */}
//       <div className="max-w-7xl mx-auto flex justify-end mb-6">
//         <button
//           onClick={() => navigate("/my-leaves")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md font-medium transition"
//         >
//           📋 My Leave Requests
//         </button>
//       </div>

//       {/* Main Grid */}
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">

//           <h2 className="text-2xl font-bold text-gray-800 mb-8">
//             👤 My Profile
//           </h2>

//           <div className="mb-5">
//             <label className="text-sm text-gray-500">
//               User ID
//             </label>

//             <input
//               type="text"
//               value={user.id}
//               disabled
//               className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
//             />
//           </div>

//           <div className="mb-5">
//             <label className="text-sm text-gray-500">
//               Full Name
//             </label>

//             <input
//               type="text"
//               value={user.name}
//               onChange={handleChange}
//               className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div className="mb-8">
//             <label className="text-sm text-gray-500">
//               Email
//             </label>

//             <input
//               type="email"
//               value={user.email}
//               disabled
//               className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
//             />
//           </div>
// {/* Joining Date */}
// <div className="mb-5">
//   <label className="text-sm text-gray-500">
//     Joining Date
//   </label>

//   <input
//     type="date"
//     value={user.joiningDate || ""}
//     disabled
//     className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
//   />
// </div>

// {/* Salary */}
// <div className="mb-8">
//   <label className="text-sm text-gray-500">
//     Salary
//   </label>

//   <input
//     type="text"
//     value={user.salary ? `₹ ${user.salary}` : ""}
//     disabled
//     className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
//   />
// </div>

//           <button
//             onClick={handleUpdate}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             Update Profile
//           </button>
//         </div>

//         {/* Leave Request Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">

//           <h2 className="text-2xl font-bold text-gray-800 mb-8">
//             📅 Leave Request
//           </h2>

//           <form onSubmit={handleLeaveSubmit}>

//             <div className="mb-5">
//               <label className="text-sm text-gray-500">
//                 Employee Name
//               </label>

//               <input
//                 type="text"
//                 value={user.name}
//                 disabled
//                 className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
//               />
//             </div>

//             <div className="mb-5">
//               <label className="text-sm text-gray-500">
//                 From Date
//               </label>

//               <input
//                 type="date"
//                 name="fromDate"
//                 value={leave.fromDate}
//                 onChange={handleLeaveChange}
//                 className="w-full mt-2 px-4 py-3 border rounded-xl"
//               />
//             </div>

//             <div className="mb-5">
//               <label className="text-sm text-gray-500">
//                 To Date
//               </label>

//               <input
//                 type="date"
//                 name="toDate"
//                 value={leave.toDate}
//                 onChange={handleLeaveChange}
//                 className="w-full mt-2 px-4 py-3 border rounded-xl"
//               />
//             </div>

//             <div className="mb-5">
//               <label className="text-sm text-gray-500">
//                 Reason
//               </label>

//               <textarea
//                 rows="4"
//                 name="reason"
//                 value={leave.reason}
//                 onChange={handleLeaveChange}
//                 placeholder="Enter reason..."
//                 className="w-full mt-2 px-4 py-3 border rounded-xl"
//               />
//             </div>

//             <div className="mb-8">
//               <label className="text-sm text-gray-500">
//                 Status
//               </label>

//               <input
//                 type="text"
//                 value="PENDING"
//                 disabled
//                 className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
//             >
//               Send Leave Request
//             </button>

//           </form>
//         </div>

// {/* Assinged projects */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">

//   <h2 className="text-2xl font-bold text-gray-800 mb-6">
//     🚀 Assigned Projects
//   </h2>

//   {
//     projects.length === 0 ? (

//       <p className="text-gray-500">
//         No Project Assigned
//       </p>

//     ) : (

//       projects.map((project) => (

//         <div
//           key={project.id}
//           className="border rounded-xl p-4 mb-4 bg-gray-50"
//         >

//           <h3 className="font-bold text-lg text-blue-700">
//             {project.projectName}
//           </h3>

//           <p>
//             <span className="font-semibold">
//               Department:
//             </span>
//             {" "}
//             {project.department}
//           </p>

//           <p>
//             <span className="font-semibold">
//               Role:
//             </span>
//             {" "}
//             {project.roleAssigned}
//           </p>

//           <p>
//             <span className="font-semibold">
//               Start Date:
//             </span>
//             {" "}
//             {project.startDate}
//           </p>

//           <p>
//             <span className="font-semibold">
//               Completion Date:
//             </span>
//             {" "}
//             {project.completionDate}
//           </p>

//           <div className="mt-3">

//             <span
//               className={`px-3 py-1 rounded-full text-white text-sm
//               ${
//                 project.status === "COMPLETED"
//                   ? "bg-green-600"
//                   : project.status === "ON_HOLD"
//                   ? "bg-yellow-500"
//                   : "bg-blue-600"
//               }`}
//             >
//               {project.status}
//             </span>

//           </div>

//         </div>

//       ))

//     )
//   }

// </div>

//       </div>
//     </div>
//   );
};

export default UserProfile;

