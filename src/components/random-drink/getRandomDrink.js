import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchRandomDrink from "./fetchRandomDrink";

export const getRandomDrink = createAsyncThunk(
  "getRandomDrink",
  async () => await fetchRandomDrink()
);
export default getRandomDrink;
