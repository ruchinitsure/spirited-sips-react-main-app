import React, { useState } from "react";
import { Link } from "react-router-dom";
import { parseTime } from "../blog/parseTime";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReviewThunk,
  updateReviewThunk,
} from "../reviews/reviews-thunks";
import "../index.css";

const CommentComponent = ({ rerender, u }) => {
  const { currentUser } = useSelector((event) => event.users);
  const [editable, setEditable] = useState(false);
  const [editComment, setEditComment] = useState(u.review);
  const dispatch = useDispatch();
  const updateCommentHandle = () => {
    const newComment = {
      ...u,
      review: editComment,
    };
    dispatch(updateReviewThunk(newComment));
    setEditable(false);
  };

  const deleteCommentHandle = () => {
    dispatch(deleteReviewThunk(u._id));
    setEditable(false);
  };

  return (
    <li className={"list-group-item"}>
      {!editable && currentUser && currentUser._id === u.author._id && (
        <h5>
          <i
            className="bi bi-pencil-fill float-end wd-cursor-pointer"
            onClick={() => setEditable(!editable)}
          ></i>
        </h5>
      )}

      <span className={"fw-bold"}>
        <Link className={"text-black"} to={`/profile/${u.author._id}`}>
          {u.author.username}
        </Link>
      </span>
      <span>
        <i className="bi bi-dot"></i>
        {parseTime(u.time)}
      </span>
      {editable ? (
        <>
          <Form.Control
            className={"mb-2 mt-2"}
            onChange={(event) => setEditComment(event.target.value)}
            as="textarea"
            value={editComment}
          />
          <Button
            variant={"primary"}
            className={"me-2"}
            onClick={updateCommentHandle}
          >
            Update
          </Button>
          <Button
            variant={"danger"}
            className={"me-2"}
            onClick={deleteCommentHandle}
          >
            Delete
          </Button>
          <Button variant={"secondary"} onClick={() => setEditable(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <p>{u.review}</p>
      )}
    </li>
  );
};

export default CommentComponent;
