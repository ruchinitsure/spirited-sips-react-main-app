import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  return currentUser ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
