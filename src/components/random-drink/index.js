import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getRandomDrink } from "./getRandomDrink";
import DrinkCard from "../drink-card/drinkCard";

const RandomRecipes = () => {
  const { recipes, loading } = useSelector((state) => state.randomDrinks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomDrink());
  }, [dispatch]);

  console.log(recipes);

  return (
    <Row>
      {!loading &&
        recipes.map((recipe) => <DrinkCard key={recipe.idDrink} drink={recipe} />)}
    </Row>
  );
};

export default RandomRecipes;
