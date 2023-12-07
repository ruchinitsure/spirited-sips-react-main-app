import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "./users-thunk";

const CurrentUser = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      dispatch(profileThunk());
    }
  }, [currentUser, dispatch]);

  return children;
};

export default CurrentUser;
