import { createAsyncThunk } from "@reduxjs/toolkit";
import { findDrinkBySearchTerm } from "../../services/search-service";

export const findDrinkBySearchTermThunk = createAsyncThunk(
  "findFoodBySearchTerm",
  (term) => findDrinkBySearchTerm(term)
);
