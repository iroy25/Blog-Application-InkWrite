import { useAuth } from "../utils/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  // if (user.role !== "admin") return <Navigate to="/" />;

  if (user.role !== "ROLE_ADMIN") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;