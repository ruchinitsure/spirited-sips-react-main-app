import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReview,
  deleteReviewService,
  findReviewsByAuthor,
  findReviewsByFood,
  updateReviewService,
} from "../../services/reviews-service";

export const createReviewThunk = createAsyncThunk(
  "createReviewThunk",
  async (review) => createReview(review)
);

export const updateReviewThunk = createAsyncThunk(
  "updateReviewThunk",
  async (comment) => updateReviewService(comment)
);
export const findReviewsByFoodThunk = createAsyncThunk(
  "findReviewsByFoodThunk",
  async (idDrink) => findReviewsByFood(idDrink)
);
export const findReviewsByAuthorThunk = createAsyncThunk(
  "findReviewsByAuthorThunk",
  async (author) => findReviewsByAuthor(author)
);

export const deleteReviewThunk = createAsyncThunk(
  "deleteReviewCommentThunk",
  async (reviewID) => deleteReviewService(reviewID)
);
