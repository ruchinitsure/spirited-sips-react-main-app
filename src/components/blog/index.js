import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllBlogsThunk } from "./blog-thunks";
import { parseTime } from "./parseTime";
import { Link } from "react-router-dom";
import { userLikesFoodThunk } from "../likes/likes-thunks";
import { followUserThunk } from "../follows/follows-thunks";
import "../index.css";

const blogs = [
  {
    _id: "123",
    title: "title1",
    username: "bob",
    summary: "this a simple food blog by bob",
    date: "3h",
  },
  {
    _id: "234",
    title: "title2",
    username: "alice",
    summary: "this a simple food blog by alice",
    date: "4h",
  },
];

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { blog, loading } = useSelector((state) => state.blog);

  const [liked, setLiked] = useState(false);
  const handleLikeBtn = () => {
    dispatch(userLikesFoodThunk());
  };

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, []);

  console.log(blog, loading);
  return (
    <div>
      {currentUser !== null && currentUser.role === "BLOGGER" && (
        <Button onClick={() => navigate("create")}>Create</Button>
      )}

      <h2>Recent Blog</h2>

      <ul className={"list-group"}>
        {blog.map((b) => (
          <li
            className={"list-group-item wd-cursor-pointer"}
            onClick={() => navigate("details/" + b._id)}
            key={b._id}
          >
            <h5>{b.title}</h5>

            <div className={"text-secondary"}>
              <span>By: {b.author.authorName}</span>
              <i className="bi bi-dot"></i>
              <span>{parseTime(b.time)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blog;
