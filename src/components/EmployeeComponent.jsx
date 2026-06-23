import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const [joiningDate, setJoiningDate] = useState('');
const [salary, setSalary] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
     joiningDate: '',
  salary: ''
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
           setJoiningDate(res.data.joiningDate);
        setSalary(res.data.salary);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, joiningDate, salary };

      if (id) {
        updateEmployee(id, employee)
          .then(() => navigator('/employees'))
          .catch(err => console.error(err));
      } else {
        createEmployee(employee)
          .then(() => navigator('/employees'))
          .catch(err => console.error(err));
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    errorsCopy.firstName = firstName.trim() ? '' : 'First Name is required';
    errorsCopy.lastName = lastName.trim() ? '' : 'Last Name is required';
    errorsCopy.email = email.trim() ? '' : 'Email is required';
    errorsCopy.joiningDate = joiningDate ? '' : 'Joining Date is required';
errorsCopy.salary = salary ? '' : 'Salary is required';

    if (!firstName || !lastName || !email ||  !joiningDate ||
  !salary) valid = false;

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          {id ? "Update Employee" : "Add Employee"}
        </h2>

        {/* FORM */}
        <form onSubmit={saveEmployee} className="space-y-4">

          {/* FIRST NAME */}
          <div>
            <label className="text-sm text-gray-600">First Name</label>
            <input
              type="text"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

{/* JOINING DATE */}
<div>
  <label className="text-sm text-gray-600">
    Joining Date
  </label>

  <input
    type="date"
    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={joiningDate}
    onChange={(e) => setJoiningDate(e.target.value)}
  />
</div>

{/* SALARY */}
<div>
  <label className="text-sm text-gray-600">
    Salary
  </label>

  <input
    type="number"
    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={salary}
    onChange={(e) => setSalary(e.target.value)}
    placeholder="Enter Salary"
  />
</div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {id ? "Update" : "Add"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default EmployeeComponent;


