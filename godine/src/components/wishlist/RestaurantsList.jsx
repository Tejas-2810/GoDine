import React from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantCard.css'; 

const RestaurantsList = ({ restaurants }) => {
    return (
        <div className="card-container c-container">
            {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant}  />
            ))}
        </div>
    );
};

export default RestaurantsList;
