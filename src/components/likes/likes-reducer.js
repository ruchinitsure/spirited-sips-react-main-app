import { createSlice } from "@reduxjs/toolkit";
import { findLikesByUserThunk, userLikesFoodThunk } from "./likes-thunks";

const likesReducer = createSlice({
  name: "likes",
  initialState: {
    likes: [],
  },
  extraReducers: {
    [userLikesFoodThunk.fulfilled]: (state, action) => {
      state.likes.unshift(action.payload);
    },
    [findLikesByUserThunk.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
  },
});

export default likesReducer.reducer;
