import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeavesComponent = () => {

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {

    axios.get(`${API}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(userRes => {

      const email = userRes.data.email;

      return axios.get(
        `${API}/api/leave-request/employee/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    })
    .then(res => setLeaveRequests(res.data))
    .catch(err => console.log(err));

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Leave Requests 📅
        </h1>

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">From Date</th>
              <th className="p-3">To Date</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {leaveRequests.map((leave) => (

              <tr key={leave.id} className="border-b">

                <td className="p-3">
                  {leave.fromDate}
                </td>

                <td className="p-3">
                  {leave.toDate}
                </td>

                <td className="p-3">
                  {leave.reason}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded text-white
                    ${
                      leave.status === "PENDING"
                        ? "bg-yellow-500"
                        : leave.status === "APPROVED"
                        ? "bg-green-600"
                        : leave.status === "REJECTED"
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {leave.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyLeavesComponent;