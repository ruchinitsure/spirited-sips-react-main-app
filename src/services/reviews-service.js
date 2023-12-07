import axios from "axios";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000"
const FOOD_REVIEWS_API = BASE_API_URL + "/api/reviews/drink";
const AUTHOR_REVIEWS_API = BASE_API_URL + "/api/users";

const api = axios.create({ withCredentials: true });

export const createReview = async (review) => {
  console.log(review);
  const response = await api.post(
    `${FOOD_REVIEWS_API}/${review.idDrink}`,
    review
  );
  return response.data;
};

export const updateReviewService = async (comment) => {
  const response = await api.put(`${FOOD_REVIEWS_API}/${comment._id}`, comment);
  return response.data;
};

export const deleteReviewService = async (commentID) => {
  const response = await api.delete(`${FOOD_REVIEWS_API}/${commentID}`);
  return response.data;
};

export const findReviewsByFood = async (idDrink) => {
  const response = await api.get(`${FOOD_REVIEWS_API}/${idDrink}`);
  return response.data;
};

export const findReviewsByAuthor = async (author) => {
  const response = await api.get(`${AUTHOR_REVIEWS_API}/${author}/reviews`);
  return response.data;
};
