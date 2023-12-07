import { createSlice } from "@reduxjs/toolkit";
import { getRandomDrink } from "./getRandomDrink";

const initialState = {
  recipes: [],
  loading: false,
};

const randomDrinkSlice = createSlice({
  name: "randomDrinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomDrink.pending, (state) => {
        state.loading = true;
        state.recipes = [];
      })
      .addCase(getRandomDrink.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recipes = payload;
      });
  },
});

export default randomDrinkSlice.reducer;
