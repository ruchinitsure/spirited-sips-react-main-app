import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findAllUsersThunk } from "./users-thunk";

const Users = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, [dispatch]);

  return (
    <>
      <h1>Users ({users.length})</h1>
      {loading && <div>Loading...</div>}
      {!loading && users.length === 0 && <div>No users found.</div>}
      {!loading && users.length > 0 && (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id} className="list-group-item">
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;
