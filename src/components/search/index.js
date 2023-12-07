import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findDrinkBySearchTermThunk } from "./search-thunks";
import DrinkCard from "../drink-card/drinkCard";
import Row from "react-bootstrap/Row";
import { useParams, useNavigate } from "react-router-dom";

const Search = () => {
  const { searchName } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchName || "");
  const { recipes, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findDrinkBySearchTermThunk(searchTerm));
  }, [searchTerm]);

  const searchHandle = () => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
      <h2>Search</h2>
      <div>
        <button className="btn btn-primary float-end" onClick={searchHandle}>
          Search
        </button>
        <input
          className="form-control w-75"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        />
      </div>
      <Row>
        {recipes &&
          recipes.map((drink) => <DrinkCard drink={drink} key={drink.idDrink} />)}
      </Row>
    </>
  );
};

export default Search;
