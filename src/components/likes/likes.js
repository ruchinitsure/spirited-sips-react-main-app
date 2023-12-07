import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLikesFoodThunk } from "./likes-thunks";

const Likes = ({ uid, p1, p2 }) => {
  const likes = [uid];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLikesFoodThunk(uid));
  }, []);
  return (
    <>
      <h2>Likes</h2>
      <div className="list-group">
        {likes.map((like) => (
          <div>
            <pre>{JSON.stringify(like, null, 2)}</pre>
          </div>
        ))}
      </div>
    </>
  );
};

export default Likes;