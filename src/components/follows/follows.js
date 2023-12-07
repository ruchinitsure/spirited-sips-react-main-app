import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findUserByIdThunk } from "../users/users-thunk";
import { findReviewsByAuthorThunk } from "../reviews/reviews-thunks";
import { findFollowersThunk, findFollowingThunk } from "./follows-thunks";
import { Link } from "react-router-dom";

const Follows = ({ uid }) => {
  const { followers, following } = useSelector((state) => state.follows);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findFollowersThunk(uid));
    dispatch(findFollowingThunk(uid));
  }, []);
  return (
    <>
      <h2>Following</h2>
      <div className="list-group">
        {following && following.length > 0 ? (
          following.map((follow) => (
            <Link
              to={`/profile/${follow.followed._id}`}
              className="list-group-item"
            >
              {follow.followed.username}
            </Link>
          ))
        ) : (
          <p>This user haven't followed anyone .</p>
        )}
      </div>
      <h2>Followers</h2>
      <div className="list-group">
        {followers && followers.length > 0 ? (
          followers.map((follow) => (
            <Link
              to={`/profile/${follow.follower._id}`}
              className="list-group-item"
            >
              {follow.follower.username}
            </Link>
          ))
        ) : (
          <p>This user don't have followers yet.</p>
        )}
      </div>
    </>
  );
};

export default Follows;
