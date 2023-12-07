import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserByIdThunk } from "./users-thunk";
import { findReviewsByAuthorThunk } from "../reviews/reviews-thunks";
import { Link } from "react-router-dom";
import {
  findFollowersThunk,
  findFollowingThunk,
  followUserThunk,
} from "../follows/follows-thunks";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Follows from "../follows/follows";
import Likes from "../likes/likes";
import { getBlogsByUserIdThunk } from "../blog/blog-thunks";
import { userLikesFoodThunk } from "../likes/likes-thunks";
import { parseTime } from "../blog/parseTime";

const PublicProfile = () => {
  const { uid } = useParams();
  const { publicProfile } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.users);
  const { blog } = useSelector((state) => state.blog);
  const { reviews } = useSelector((state) => state.reviews);
  const { followers, following } = useSelector((state) => state.follows);
  const [followedBtn, setFollowedBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFollowBtn = () => {
    dispatch(
      followUserThunk({
        followed: uid,
      })
    );
    setFollowedBtn(!followedBtn);
  };

  useEffect(() => {
    dispatch(findUserByIdThunk(uid));
    dispatch(getBlogsByUserIdThunk(uid));

    dispatch(findReviewsByAuthorThunk(uid));
    dispatch(findFollowersThunk(uid));
    dispatch(findFollowingThunk(uid));
  }, [uid]);

  return (
    <div className={"mb-3 mt-2"}>
      <div className={"mb-2"}>
        <Link to={-1} className={"text-decoration-none text-secondary"}>
          <i className="bi bi-arrow-left me-1"></i>Back
        </Link>
      </div>

      {publicProfile && (
        <>
          {currentUser ? (
            <>
              {followedBtn ? (
                <Button variant={"outline-success"} className={"float-end"}>
                  Followed
                </Button>
              ) : (
                <Button onClick={handleFollowBtn} className={"float-end"}>
                  Follow
                </Button>
              )}
            </>
          ) : (
            <></>
          )}

          <h2>@{publicProfile.username}</h2>

          <h5>
            <Badge bg={"secondary"}>{publicProfile.role}</Badge>
          </h5>
          <Container>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="profileFirstName"
              >
                <Form.Label column sm="2" className={"text-secondary"}>
                  First Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={publicProfile.firstName}
                    plaintext
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="profileLastName">
                <Form.Label column sm="2" className={"text-secondary"}>
                  Last Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={publicProfile.lastName}
                    plaintext
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Form>

            <hr />

            {publicProfile && publicProfile.role === "BLOGGER" && (
              <>
                <h2>Blogs</h2>
                <ul className={"list-group mb-3"}>
                  {blog && blog.length === 0 ? (
                    <p>This user haven't written any blog.</p>
                  ) : (
                    blog
                      .filter(
                        (bg) => bg.author.authorName === publicProfile.username
                      )
                      .map((b) => (
                        <li
                          className={"list-group-item"}
                          onClick={() => navigate("/blog/details/" + b._id)}
                          key={b._id}
                        >
                          <h5>{b.title}</h5>

                          <i
                            onClick={() => {
                              dispatch(userLikesFoodThunk());
                            }}
                            className="red"
                          ></i>
                          <div className={"text-secondary"}>
                            <span>By: {b.author.authorName}</span>
                            <i className="bi bi-dot"></i>
                            <span>{parseTime(b.time)}</span>
                          </div>
                        </li>
                      ))
                  )}
                </ul>
              </>
            )}

            <Follows uid={publicProfile._id} />

            {/*<h2>Following</h2>*/}
            {/*<div className="list-group">*/}
            {/*    {*/}
            {/*        following &&*/}
            {/*        following.length > 0 ?*/}
            {/*            following.map((follow) =>*/}
            {/*                                       <Link to={`/profile/${follow.following._id}`} className="list-group-item">*/}
            {/*                                           {follow.following.username}*/}
            {/*                                       </Link>*/}
            {/*                  )*/}
            {/*            :*/}
            {/*            <p>This user haven't followed anyone .</p>*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<h2>Followers</h2>*/}
            {/*<div className="list-group">*/}
            {/*    {*/}
            {/*        followers &&*/}
            {/*        followers.length > 0 ? followers.map((follow) =>*/}
            {/*                                       <Link to={`/profile/${follow.followers._id}`} className="list-group-item">*/}
            {/*                                           {follow.followers.username}*/}
            {/*                                       </Link>*/}
            {/*                  )*/}
            {/*            :*/}
            {/*            <p>This user don't have followers yet.</p>*/}
            {/*    }*/}
            {/*</div>*/}

            <h2>Comments</h2>
            <ul className={"list-group"}>
              {publicProfile && reviews && reviews.length === 0 ? (
                <p>This user haven't posted any comments yet.</p>
              ) : (
                reviews
                  .filter((u) => u.author._id === uid)
                  .map((u) => (
                    <li
                      className={"list-group-item"}
                      onClick={() => navigate(`/drink/details/${u.idDrink}`)}
                    >
                      <span className={"fw-bold"}>
                        <Link
                          className={"text-black"}
                          to={`/profile/${u.author._id}`}
                        >
                          {u.author.username}
                        </Link>
                      </span>
                      <span>
                        <i className="bi bi-dot"></i>
                        {parseTime(u.time)}
                      </span>
                      <p>{u.review}</p>
                    </li>
                  ))
              )}
            </ul>
          </Container>
        </>
      )}
    </div>
  );
};

export default PublicProfile;
