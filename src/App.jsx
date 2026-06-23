import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import LoginComponent from "./components/LoginComponent";
import OAuthSuccess from "./components/OAuthSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import { useEffect } from "react";
import ListLeaveRequestComponent from "./components/ListLeaveRequestComponent";
import MyLeavesComponent from "./components/MyLeaveComponent";
import ProjectAssignmentComponent from "./components/ProjectAssignmentComponent";
const API = import.meta.env.VITE_API_URL;
function App() {
  useEffect(() => {
    fetch(`${API}`).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        <Route path="/employees" element={<ListEmployeeComponent />} />
        <Route path="/add-employee" element={<EmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
        <Route path="/" element={<LoginComponent />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/leave-requests" element={<ListLeaveRequestComponent />} />
        <Route
  path="/my-leaves"
  element={<MyLeavesComponent />}
/>
<Route
  path="/project-assignments"
  element={<ProjectAssignmentComponent />}
/>

        {/* 🔥 ADMIN */}
        <Route
          path="/list-of-employee"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <ListEmployeeComponent />
            </ProtectedRoute>
          }
        />

        {/* 🔥 USER */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
