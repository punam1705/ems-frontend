import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload.role;

  // 🔥 agar ADMIN page pe USER aa gaya
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/profile" />; // ❗ NOT "/"
  }

  return children;
};

export default ProtectedRoute;