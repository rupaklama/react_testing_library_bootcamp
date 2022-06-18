import React from "react";
import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ cats, setCats }) => {
  const updateFavored = (index, favored) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favored;
    setCats(updatedCats);
  };

  return (
    <div className="pet-cards-container">
      {cats.map((cat, index) => (
        <Card
          key={cat.id}
          name={cat.name}
          phone={cat.phone}
          email={cat.email}
          image={cat.image}
          favoured={cat.favoured}
          updatedFavorite={updateFavored}
          index={index}
        />
      ))}
    </div>
  );
};

export default Cards;
