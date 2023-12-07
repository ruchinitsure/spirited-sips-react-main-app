import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedAdminDashboard = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  if (currentUser != null && currentUser.role === "ADMIN") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
export default ProtectedAdminDashboard;
