import React, { useEffect, useState } from "react";
import "./results.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
const Results = () => {
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [ratings, setRatings] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    cuisine: "",
    rating: 0,
    discount: 0,
  });
  const [favorites, setFavorites] = useState({});
  const { getUserId } = useAuth();
  const userId = getUserId();
  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      const wishlisturl = `http://localhost:8080/users/wishlist/${userId}`;
      try {
        const [wishlistResponse] = await Promise.all([
          axios.get(wishlisturl, { withCredentials: true }),
        ]);
        const wishlistData = wishlistResponse.data;
        // Filter out null values and convert the array to an object
        const favoritesObj = wishlistData.reduce((acc, curr) => {
          if (curr !== null) {
            // Check to ensure null values are not included
            acc[curr] = true;
          }
          return acc;
        }, {});
        setFavorites(favoritesObj);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();

    const fetchRestaurantsAndDiscounts = async () => {
      try {
        const restaurantsResponse = await fetch(
          "http://localhost:8080/api/restaurants/"
        );
        const restaurantsData = await restaurantsResponse.json();
        setRestaurants(restaurantsData);

        const discountsResponse = await fetch(
          "http://127.0.0.1:8080/api/discountsPromotions/discounts"
        );
        const discountsData = await discountsResponse.json();
        setDiscounts(discountsData);

        restaurantsData.forEach(async (restaurant) => {
          try {
            const response = await fetch(
              `http://127.0.0.1:8080/api/restaurants/${restaurant._id}/reviews`
            );
            const data = await response.json();
            setRatings((prevRatings) => ({
              ...prevRatings,
              [restaurant._id]: parseInt(data.averageRating, 10) || "Not Rated",
            }));
          } catch (error) {
            console.error("Error fetching ratings:", error);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRestaurantsAndDiscounts();
  }, [userId]);

  const findDiscountForRestaurant = (restaurantId) => {
    const discount = discounts.find((d) => d.restaurantID === restaurantId);
    return discount ? discount.discountPercentage : 0;
  };

  const applyFilters = (restaurant) => {
    const matchesLocation =
      !selectedFilters.location ||
      restaurant.restaurantAddress.includes(selectedFilters.location);
    const matchesCuisine =
      !selectedFilters.cuisine ||
      restaurant.cuisine === selectedFilters.cuisine;
    const rating = ratings[restaurant._id];
    const matchesRating =
      !selectedFilters.rating ||
      (rating && parseInt(rating, 10) === selectedFilters.rating);
    const discount = findDiscountForRestaurant(restaurant._id);
    const matchesDiscount =
      !selectedFilters.discount || discount === selectedFilters.discount;

    return (
      matchesLocation && matchesCuisine && matchesRating && matchesDiscount
    );
  };

  const handleFilterChange = (filter, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const toggleFavorite = async (restaurantId) => {
    const userId = getUserId(); // Assuming getUserId() is a function that returns the current user's ID
    console.log("User ID:", userId);

    const isFavorite = !!favorites[restaurantId]; // Assuming 'favorites' is an object tracking the favorite status
    console.log(
      `Is favorite before action: ${isFavorite} for restaurantId: ${restaurantId}`
    );

    const action = isFavorite ? "remove" : "add";
    const method = isFavorite ? "DELETE" : "POST";
    const url =
      `http://localhost:8080/users/wishlist/${action}/${userId}` +
      (action === "remove" ? `?restaurantID=${restaurantId}` : "");

    try {
      await axios({
        method: method,
        url: url,
        withCredentials: true,
        ...(method === "POST" && {
          data: { restaurantID: restaurantId },
        }),
      });

      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [restaurantId]: !isFavorite,
      }));

      console.log(
        `Restaurant successfully ${action === "add" ? "added to" : "removed from"} wishlist.`
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error(
          `Error updating wishlist: ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("The request was made but no response was received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  const showAllRestaurants = () => {
    setSelectedFilters({ location: "", cuisine: "", rating: 0, discount: 0 });
  };

  const uniqueCuisines = [
    ...new Set(restaurants.map((restaurant) => restaurant.cuisine)),
  ];
  const uniqueLocations = [
    ...new Set(
      restaurants.map((restaurant) =>
        restaurant.restaurantAddress.split(",")[1]?.trim()
      )
    ),
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return applyFilters(restaurant);
  });

  return (
    <div className="container cb">
      <button
        className="btn btn-secondary"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>
      <button className="btn btn-primary" onClick={showAllRestaurants}>
        Show All Restaurants
      </button>

      {filtersOpen && (
        <div className="filter-panel">
          <div className="filter-group">
            <label htmlFor="location-filter">Location</label>
            <select
              id="location-filter"
              className="form-control"
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((location, idx) => (
                <option key={idx} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="cuisine-filter">Cuisine</label>
            <select
              id="cuisine-filter"
              className="form-control"
              onChange={(e) => handleFilterChange("cuisine", e.target.value)}
            >
              <option value="">All Cuisines</option>
              {uniqueCuisines.map((cuisine, idx) => (
                <option key={idx} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="rating-filter">Rating</label>
            <select
              id="rating-filter"
              className="form-control"
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            >
              <option value="0">All Ratings</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="discount-filter">Discount</label>
            <select
              id="discount-filter"
              className="form-control"
              onChange={(e) => handleFilterChange("discount", e.target.value)}
            >
              <option value="0">Any Discount</option>
              <option value="10">10% Off</option>
              <option value="20">20% Off</option>
              <option value="30">30% Off</option>
            </select>
          </div>
        </div>
      )}

      <section className="restaurant-list">
        <div className="row">
          {filteredRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="col-sm-4"
              onClick={() => console.log("Restaurant ID:", restaurant._id)}
            >
              <div className="card mb-3">
                <img
                  src={
                    restaurant.photos[0] || "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt={restaurant.restaurantName}
                />
                <div className="card-body">
                  <div
                    className="favorite-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(restaurant._id);
                    }}
                  >
                    {favorites[restaurant._id] ? (
                      <AiFillHeart size={24} color="red" />
                    ) : (
                      <AiOutlineHeart size={24} />
                    )}
                  </div>
                  <h5 className="card-title">{restaurant.restaurantName}</h5>
                  <p className="m-0">
                    Description:{" "}
                    {restaurant.description || "No description available"}
                  </p>
                  <p className="m-0">
                    Discount: {findDiscountForRestaurant(restaurant._id) || "0"}
                    %
                  </p>
                  <p className="m-0">
                    Location: {restaurant.restaurantAddress.split(",")[1]}
                  </p>
                  <p className="m-0">Cuisine: {restaurant.cuisine}</p>
                  <p className="m-0">
                    Ratings:{" "}
                    {ratings[restaurant._id] !== undefined
                      ? ratings[restaurant._id]
                      : "Not Rated"}
                  </p>
                  <button className="btn btn-primary">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Results;
