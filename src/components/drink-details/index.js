import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { drinkDetailsThunks } from "./drink-details-thunks";
import YoutubeEmbed from "./youtube-embed";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  createReviewThunk,
  findReviewsByFoodThunk,
} from "../reviews/reviews-thunks";
import CommentComponent from "./comment-component";
import Container from "react-bootstrap/Container";
import { userLikesFoodThunk } from "../likes/likes-thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";

const BASE_API_URL = "http://localhost:4000";
const USERS_URL = BASE_API_URL + "/users";

const api = axios.create({ withCredentials: true });

const DrinkDetails = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { drink, loading } = useSelector((state) => state.drinkDetails);
  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { mid } = useParams();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    dispatch(drinkDetailsThunks(mid));
    dispatch(findReviewsByFoodThunk(mid));
  }, []);

  const postDrinkComment = () => {
    const review = {
      idDrink: drink.idDrink,
      review: comment,
    };
    dispatch(createReviewThunk(review));
    setComment("");
    dispatch(findReviewsByFoodThunk(mid));
  };

  const reloadComments = () => {
    dispatch(findReviewsByFoodThunk(mid));
  };

  useEffect(() => {
    if (currentUser) {
      api.get(`${USERS_URL}/${currentUser._id}/likes`).then((response) => {
        setUserLikes(response.data);
        const isLiked = response.data.some(
          (like) => like.idDrink === drink.idDrink && like.liked
        );
        setLiked(isLiked);
      });
    }
  }, [currentUser, drink.idDrink]);

  const toggleDrinkLike = () => {
    if (!liked) {
      const like = {
        idDrink: drink.idDrink,
      };
      dispatch(userLikesFoodThunk(like));
      setLiked(true);
    } else {
      api
        .delete(`${USERS_URL}/${currentUser._id}/likes/${drink.idDrink}`)
        .then(() => {
          setLiked(false);
          setUserLikes(userLikes.filter((like) => like.idDrink !== drink.idDrink));
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  function handleGoBack(event) {
    event.preventDefault();
    navigate(-1);
  }
  

  const ingredientList = [20];
  ingredientList[0] = drink.strMeasure1 + " " + drink.strIngredient1;
  ingredientList[1] = drink.strMeasure2 + " " + drink.strIngredient2;
  ingredientList[2] = drink.strMeasure3 + " " + drink.strIngredient3;
  ingredientList[3] = drink.strMeasure4 + " " + drink.strIngredient4;
  ingredientList[4] = drink.strMeasure5 + " " + drink.strIngredient5;
  ingredientList[5] = drink.strMeasure6 + " " + drink.strIngredient6;
  ingredientList[6] = drink.strMeasure7 + " " + drink.strIngredient7;
  ingredientList[7] = drink.strMeasure8 + " " + drink.strIngredient8;
  ingredientList[8] = drink.strMeasure9 + " " + drink.strIngredient9;
  ingredientList[9] = drink.strMeasure10 + " " + drink.strIngredient10;
  ingredientList[10] = drink.strMeasure11 + " " + drink.strIngredient11;
  ingredientList[11] = drink.strMeasure12 + " " + drink.strIngredient12;
  ingredientList[12] = drink.strMeasure13 + " " + drink.strIngredient13;
  ingredientList[13] = drink.strMeasure14 + " " + drink.strIngredient14;
  ingredientList[14] = drink.strMeasure15 + " " + drink.strIngredient15;
  // ingredientList[15] = drink.strMeasure16 + " " + drink.strIngredient16;
  // ingredientList[16] = drink.strMeasure17 + " " + drink.strIngredient17;
  // ingredientList[17] = drink.strMeasure18 + " " + drink.strIngredient18;
  // ingredientList[18] = drink.strMeasure19 + " " + drink.strIngredient19;
  // ingredientList[19] = drink.strMeasure20 + " " + drink.strIngredient20;
  return (
    <div className={"mt-3"}>
      <div className={"mb-2"}>
        <a
          onClick={handleGoBack}
          href="src/components/drink-details#"
          className={"text-decoration-none text-secondary"}
        >
          <i className="bi bi-arrow-left me-1"></i>Back
        </a>
      </div>
      {!loading && (
        <>
          <h2>{drink.strDrink}</h2>
          <h5>
            <span className="badge bg-secondary">{drink.strAlcoholic}</span>{" "}
            <span className="badge bg-secondary">{drink.strCategory}</span>
            <span
              className="wd-float-right wd-font-size-15px"
              disabled={!currentUser}
              onClick={() => toggleDrinkLike()}
            >
              {currentUser && liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-yellow" icon={faSolidStar} />
                </span>
              )}
              {currentUser && !liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-gray" icon={faStar} />
                </span>
              )}
              </span>
          </h5>
          <Container>
            <Row>
              <Col sm={"12"} md={"6"}>
                <img
                  className={"w-100 mb-3"}
                  alt={"Picture of " + drink.strDrink}
                  src={drink.strDrinkThumb}
                />
              </Col>
              <Col>
                <h4>Ingredients:</h4>
                <ul>
                  {ingredientList.map(
                    (u) => !u.includes("null") && u.length > 2 && <li>{u}</li>
                  )}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {typeof drink.strInstructions !== "undefined" &&
                    drink.strInstructions
                      .split("\r\n")
                      .map(
                        (u) =>
                          u.length > 4 &&
                          !u.toLowerCase().includes("step") && <li>{u}</li>
                      )}
                </ol>
              </Col>
            </Row>
          </Container>
          <hr />

          <h4>
            Comments
            <span className={"text-secondary"}>
              <i className="bi bi-dot"></i>
              {reviews.length}
            </span>
          </h4>
          <Container>
            {currentUser ? (
              <Form>
                <Form.Group className={"mb-2"}>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Leave a comment here"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      style={{ height: "6rem" }}
                    />
                  </FloatingLabel>
                  <Form.Text>Logged in as {currentUser.username}.</Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => postDrinkComment()}
                  disabled={comment === ""}
                >
                  Post Comment
                </Button>
              </Form>
            ) : (
              <Alert variant={"warning"} className={"mb-3"}>
                Please login to comment.
              </Alert>
            )}
            <ul className={"list-group mb-3 mt-3"}>
              {reviews.map((u) => (
                <CommentComponent u={u} rerender={reloadComments} key={u._id} />
              ))}
            </ul>
            <YoutubeEmbed embedId={"W50W19vwjmk?si=_M2wropho6eS2JOa"} />
          </Container>
        </>
      )}
    </div>
  );
};

export default DrinkDetails;
