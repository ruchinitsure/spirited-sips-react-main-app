import axios from "axios";

const SEARCH_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const drinkDetailsService = async (mid) => {
  const cocktailDBResponse = await axios.get(`${SEARCH_URL}${mid}`);
  return cocktailDBResponse.data.drinks[0];
};

export const getDrinkReviewsService = async (mid) => {
  const response = await axios.get(`$`);
};

export const postDrinkCommentService = async (comment) => {};
