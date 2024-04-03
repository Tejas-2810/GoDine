import React from "react";
import RestaurantCard from "./RestaurantCard";
import "./RestaurantCard.css";

const RestaurantsList = ({ restaurants, onRemove }) => {
  return (
    <div className="card-container c-container">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onRemove={() => onRemove(restaurant.id)}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
