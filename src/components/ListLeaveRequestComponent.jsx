import React, { useEffect, useState } from "react";
import { listLeaveRequests, updateLeaveStatus } from "../services/LeaveRequestService";

const ListLeaveRequestComponent = () => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getAllRequests();
    }, []);

    function getAllRequests() {
        listLeaveRequests()
            .then(res => setRequests(res.data))
            .catch(err => console.log(err));
    }

    function changeStatus(id, status) {

        updateLeaveStatus(id, status)
            .then(() => {
                setRequests(prev =>
                    prev.map(req =>
                        req.id === id
                            ? { ...req, status }
                            : req
                    )
                );
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-6">
                Leave Requests 📅
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Employee</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">From</th>
                        <th className="p-3">To</th>
                        <th className="p-3">Reason</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {requests.map(request => (

                        <tr key={request.id} className="border-b">

                            <td className="p-3">
                                {request.employeeName}
                            </td>

                            <td className="p-3">
                                {request.employeeEmail}
                            </td>

                            <td className="p-3">
                                {request.fromDate}
                            </td>

                            <td className="p-3">
                                {request.toDate}
                            </td>

                            <td className="p-3">
                                {request.reason}
                            </td>

                            <td className="p-3">
                                <span
                                    className={`px-3 py-1 rounded text-white
                                    ${
                                        request.status === "PENDING"
                                            ? "bg-yellow-500"
                                            : request.status === "APPROVED"
                                            ? "bg-green-500"
                                            : request.status === "REJECTED"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                    }`}
                                >
                                    {request.status}
                                </span>
                            </td>

                            <td className="p-3">

                                <select
                                    value={request.status}
                                    onChange={(e) =>
                                        changeStatus(request.id, e.target.value)
                                    }
                                    className="border p-2 rounded"
                                >
                                    <option value="PENDING">
                                        Pending
                                    </option>

                                    <option value="APPROVED">
                                        Approved
                                    </option>

                                    <option value="REJECTED">
                                        Rejected
                                    </option>

                                    <option value="CANCELLED">
                                        Cancelled
                                    </option>

                                </select>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ListLeaveRequestComponent;