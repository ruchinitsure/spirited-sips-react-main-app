import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDrinkReviewsService,
  drinkDetailsService,
  postDrinkCommentService,
} from "../../services/drink-details-service";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const USER_API_URL = BASE_API_URL + "/drink";

export const drinkDetailsThunks = createAsyncThunk(
  "drinkDetailsThunks/get",
  async (mid) => await drinkDetailsService(mid)
);

export const getDrinkReviewsThunk = createAsyncThunk(
  "drink/getComments",
  async (mid) => await getDrinkReviewsService(mid)
);

export const postDrinkCommentThunk = createAsyncThunk(
  "drink/postComment",
  async (comment) => await postDrinkCommentService(comment)
);