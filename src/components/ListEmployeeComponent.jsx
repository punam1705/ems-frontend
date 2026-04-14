import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((res) => setEmployees(res.data))
      .catch(err => console.error(err));
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => setEmployees(prev => prev.filter(emp => emp.id !== id)))
      .catch(err => console.error(err));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Employee Management 👨‍💼
        </h2>

        <button
          onClick={() => navigator('/add-employee')}
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Employee
        </button>
      </div>

      {/* 🔥 DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp.id}
                className={`border-b hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-6">{emp.id}</td>
                <td className="py-3 px-6">{emp.firstName}</td>
                <td className="py-3 px-6">{emp.lastName}</td>
                <td className="py-3 px-6 break-all">{emp.email}</td>

                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    onClick={() => navigator(`/edit-employee/${emp.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => removeEmployee(emp.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* 🔥 MOBILE CARD UI */}
      <div className="md:hidden space-y-4">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white p-4 rounded-xl shadow">

            <div className="mb-2">
              <p className="text-xs text-gray-400">ID</p>
              <p className="font-medium">{emp.id}</p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-400">Name</p>
              <p className="font-semibold">
                {emp.firstName} {emp.lastName}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm break-all">{emp.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigator(`/edit-employee/${emp.id}`)}
                className="flex-1 bg-yellow-400 text-white py-2 rounded-lg text-sm"
              >
                Update
              </button>

              <button
                onClick={() => removeEmployee(emp.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* EMPTY */}
      {employees.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No employees found
        </p>
      )}

    </div>
  );
};

export default ListEmployeeComponent;
