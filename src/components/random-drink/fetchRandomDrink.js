import axios from "axios";

const SEARCH_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const fetchRandomDrink = async () => {
  const response1 = await axios.get(`${SEARCH_URL}`);
  const response2 = await axios.get(`${SEARCH_URL}`);
  const response3 = await axios.get(`${SEARCH_URL}`);
  const response4 = await axios.get(`${SEARCH_URL}`);
  return [
    response1.data.drinks[0],
    response2.data.drinks[0],
    response3.data.drinks[0],
    response4.data.drinks[0],
  ];
};

export default fetchRandomDrink;
