

import React, { useEffect, useState } from "react";
import {
  createProjectAssignment,
  listProjectAssignments,
  updateProjectStatus,
} from "../services/ProjectAssignmentService";
import { listEmployees } from "../services/EmployeeService";
import { listUsers } from "../services/UserService";

const ProjectAssignmentComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const [project, setProject] = useState({
    employeeName: "",
    employeeEmail: "",
    department: "",
    projectName: "",
    roleAssigned: "",
    startDate: "",
    completionDate: "",
    status: "IN_PROGRESS",
  });


  



useEffect(() => {

  getAllProjects();

  listEmployees()
    .then(res => {
      const employeeData = res.data.map(emp => ({
        name: `${emp.firstName} ${emp.lastName}`,
        email: emp.email
      }));

      setEmployees(employeeData);
    });

  listUsers()
    .then(res => {

      const userData = res.data.map(user => ({
        name: user.name,
        email: user.email
      }));

      setEmployees(prev => [...prev, ...userData]);
console.log("users", res.data)
    })
    .catch(err => console.log("user error", err));

}, []);

  function getAllProjects() {
    listProjectAssignments()
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  }

  // function handleEmployeeChange(e) {
  //   const employee = employees.find(
  //     (emp) => emp.email === e.target.value
  //   );

  //   if (employee) {
  //     setProject({
  //       ...project,
  //       employeeName: employee.firstName + " " + employee.lastName,
  //       employeeEmail: employee.email,
  //     });
  //   }
  // }

//   function handleEmployeeChange(e) {

//   const employee = employees.find(
//     emp => emp.email === e.target.value
//   );

//   if (employee) {

//     setProject({
//       ...project,
//       employeeName: employee.first_name,
//       employeeEmail: employee.email
//     });

//   }
// }

function handleEmployeeChange(e) {
  const employee = employees.find(
    emp => emp.email === e.target.value
  );

  if (employee) {
    setProject({
      ...project,
      employeeName: employee.name,
      employeeEmail: employee.email
    });
  }
}

  function saveProject(e) {
    e.preventDefault();

    createProjectAssignment(project)
      .then(() => {
        getAllProjects();

        setProject({
          employeeName: "",
          employeeEmail: "",
          department: "",
          projectName: "",
          roleAssigned: "",
          startDate: "",
          completionDate: "",
          status: "IN_PROGRESS",
        });

        alert("Project Assigned Successfully ✅");
      })
      .catch((err) => console.log(err));
  }

  function changeStatus(id, status) {
    updateProjectStatus(id, status)
      .then(() => getAllProjects())
      .catch((err) => console.log(err));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Assign Project */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          🚀 Assign Project
        </h2>

        <form
          onSubmit={saveProject}
          className="grid md:grid-cols-2 gap-4"
        >

          {/* Employee Dropdown */}
          <select
            value={project.employeeEmail}
            onChange={handleEmployeeChange}
            className="border p-3 rounded"
          >
            <option value="">
              Select Employee
            </option>

            {/* {employees.map((emp) => (
              <option key={emp.id} value={emp.email}>
                {emp.firstName} {emp.lastName}
              </option>
            ))} */}
            {/* {employees.map((emp) => (
  <option
    key={emp.email}
    value={emp.email}
  >
    {emp.name}
  </option>
))} */}
 {employees.map((emp) => (
    <option key={emp.email} value={emp.email}>
      {emp.name}
    </option>
  ))}
  {console.log("employees state =", employees)}
          </select>

          {/* Email */}
          <input
            type="email"
            value={project.employeeEmail}
            disabled
            placeholder="Employee Email"
            className="border p-3 rounded bg-gray-100"
          />

          {/* Department */}
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={project.department}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Project Name */}
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={project.projectName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Role */}
          <input
            type="text"
            name="roleAssigned"
            placeholder="Role Assigned"
            value={project.roleAssigned}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Start Date */}
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* Completion Date */}
          <input
            type="date"
            name="completionDate"
            value={project.completionDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
          >
            Assign Project
          </button>

        </form>
      </div>

      {/* Project History */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <h2 className="text-2xl font-bold p-6">
          📋 Project History
        </h2>

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Department</th>
              <th className="p-3">Project</th>
              <th className="p-3">Role</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Completion Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {projects.map((p) => (

              <tr key={p.id} className="border-b">

                <td className="p-3">
                  {p.employeeName}
                </td>

                <td className="p-3">
                  {p.department}
                </td>

                <td className="p-3">
                  {p.projectName}
                </td>

                <td className="p-3">
                  {p.roleAssigned}
                </td>

                <td className="p-3">
                  {p.startDate}
                </td>

                <td className="p-3">
                  {p.completionDate}
                </td>

                <td className="p-3">

                  <select
                    value={p.status}
                    onChange={(e) =>
                      changeStatus(p.id, e.target.value)
                    }
                    className="border rounded p-2"
                  >
                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>

                    <option value="ON_HOLD">
                      ON_HOLD
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

export default ProjectAssignmentComponent;