import { createSlice } from "@reduxjs/toolkit";
import { findDrinkBySearchTermThunk } from "./search-thunks";

const initialState = {
  recipes: [],
  loading: false,
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [findDrinkBySearchTermThunk.fulfilled]: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export default searchReducer.reducer;
