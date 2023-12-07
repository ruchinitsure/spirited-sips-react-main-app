import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const DrinkCard = ({ drink }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/drink/details/${drink.idDrink}`);
  };

  return (
    <Col sm={6} md={6} lg={3}>
      <Card className="mt-2 mb-2 h-100">
        <Card.Img variant="top" src={drink.strDrinkThumb} />
        <Card.Body>
          <Card.Title>{drink.strDrink}</Card.Title>
          <Card.Text>
            <h5>
              <span className="badge bg-secondary">{drink.strAlcoholic}</span>{" "}
              <span className="badge bg-secondary">{drink.strCategory}</span>
            </h5>
            <Button onClick={handleClick}>View Details</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DrinkCard;
