import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import "./RestaurantCard.css";

const tagColors = {
  Italian: "#FF5733",
  Pizza: "#33FF57",
  Vegetarian: "#DAF7A6",
  Seafood: "#FFC300",
  "Fine Dining": "#900C3F",
  Indian: "#C70039",
  Spicy: "#581845",
  "Vegan Options": "#FFC0CB",
  Chinese: "#FFD700",
  Noodles: "#FFA07A",
  "Quick Bites": "#F08080",
  Mexican: "#FF4500",
  Tacos: "#FF6347",
  "Gluten Free Options": "#8FBC8F",
  Organic: "#556B2F",
  Salads: "#7FFF00",
  American: "#3CB371",
  Burgers: "#A52A2A",
  "Fast Food": "#FFA500",
  Japanese: "#A00000",
  Sushi: "#00CED1",
  Pasta: "#FFFF00",
  "Vegetarian Friendly": "#98FB98",
  French: "#6495ED",
  Gourmet: "#6A5ACD",
};

const RestaurantCard = ({ restaurant, onRemove }) => {
  return (
    <div className="card c mb-3" style={{ maxWidth: "540px" }}>
      <div className="g-0">
        <div className="w-100">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="img-fluid"
          />
        </div>
        <div className="card-body">
          <div
            className="card-title-area c-title-area"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 className="card-title c-title">{restaurant.name}</h5>
            <FontAwesomeIcon
              icon={faHeartSolid}
              style={{ color: "red", cursor: "pointer" }}
              onClick={onRemove}
            />
          </div>
          <p className="card-text c-t">Rating: {restaurant.rating}</p>
          <div className="card-text c-t">
            {restaurant.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: tagColors[tag],
                  color: "white",
                  padding: "5px 10px",
                  marginRight: "5px",
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "5px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;