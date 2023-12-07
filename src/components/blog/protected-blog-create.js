import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedBlogCreate = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  if (currentUser) {
    if (currentUser.role === "BLOGGER") {
      return children;
    } else {
      return <Navigate to={"/"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};
export default ProtectedBlogCreate;
