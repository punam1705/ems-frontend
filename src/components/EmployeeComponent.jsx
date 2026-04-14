// import React, { useEffect, useState } from 'react'
// import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
// import { useNavigate, useParams } from 'react-router-dom';

// const EmployeeComponent = () => {

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const {id} = useParams();

// const [errors,setErrors]=useState({
//     firstName:'',
//     lastName:'',
//     email:''
// })
//   const navigator = useNavigate();

//   useEffect(() =>{
//     if(id){
//         getEmployee(id).then((response) => {
//             setFirstName(response.data.firstName);
//             setLastName(response.data.lastName);
//             setEmail(response.data.email);
//         }).catch(error => {
//             console.error(error);
//         })
//     }

//   }, [id])
//     function saveEmployee(e) {
//       e.preventDefault();

//       if(validateForm()){

//         const employee = { firstName, lastName, email };
//       console.log(employee);

//         if(id){
//         updateEmployee(id, employee).then((response) => {
//             console.log(response.data);
//             navigator('/employees');
//           }).catch (error => {
//             console.error(error);
//           });
//         } else{
//              createEmployee(employee).then((response) => {
//         console.log("Employee data saved successfully", response.data);
//         navigator('/employees');
//       }).catch(error => {
//         console.error( error);
//       });
//         }
//       }
//     };

//     function validateForm(){
//         let valid=true;
//         const errorsCopy={...errors}
//         if(firstName.trim()){
//             errorsCopy.firstName='';
//         } else{
//             errorsCopy.firstName='First Name is required';
//             valid=false;    
//         }
//         if(lastName.trim()){
//             errorsCopy.lastName='';
//         } else{
//             errorsCopy.lastName='Last Name is required';
//             valid=false;    
//         }
//         if(email.trim()){
//             errorsCopy.email='';
//         } else{
//             errorsCopy.email='Email is required';
//             valid=false;    
//         }

//         setErrors(errorsCopy);
//         return valid;
//     }

//     function pageTitle(){
//     if(id){
//         return <h2 className='text-center'>Update Employee</h2>
//     } else{
//         return <h2 className='text-center'>Add Employee</h2>
//     }
// }

//   return (
//     <div className='container'>
//         <br />
//         <div className='row'>
//             <div className='card col-md-6 offset-md-3 offset-md-3'>
//                 {
//                     pageTitle()
//                 }
              
//                 <div className='card-body'>
//                     <form>
//                         <div className='form-group mb-2'>
//                             <label className='form-label'>First Name</label>
//                             <input type='text' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} placeholder='Enter First Name' name='firstName'
//                              value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                              {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
//                         </div>
//                         <div className='form-group mb-2'>
//                             <label className='form-label'>Last Name</label>
//                             <input type='text' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} placeholder='Enter Last Name' name='lastName'
//                              value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                                 {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
//                         </div>
//                         <div className='form-group mb-2'>
//                             <label className='form-label'>Email ID</label>
//                             <input type='text' className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder='Enter Email' name='email'
//                              value={email} onChange={(e) => setEmail(e.target.value)} />
//                                 {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
//                         </div>
//                         <button className='btn btn-primary' onClick={saveEmployee}>Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default EmployeeComponent

import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

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

    if (!firstName || !lastName || !email) valid = false;

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
