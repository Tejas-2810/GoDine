import React from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantCard.css'; // Assuming this is where you put the above CSS

const RestaurantsList = ({ restaurants }) => {
    return (
        <div className="card-container">
            {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant}  />
            ))}
        </div>
    );
};

export default RestaurantsList;
