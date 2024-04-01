import React, { useEffect, useState } from "react";
import "./results.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";

const Results = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let cuisineFirst = searchParams.get("c") || "";
  if (cuisineFirst === "Any Cuisine") {
    cuisineFirst = "";
  }
  let locationFirst = searchParams.get("l") || "";
  if (locationFirst === "Select Location") {
    locationFirst = "";
  }
  let keywordFirst = searchParams.get("K") || "";

  const [restaurants, setRestaurants] = useState([]);
  const [initiallyFilteredRestaurants, setInitiallyFilteredRestaurants] =
    useState(null);
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
  const fetchRatings = (restaurantsData) => {
    restaurantsData.forEach((restaurant) => {
      fetch(`http://127.0.0.1:8080/api/restaurants/${restaurant._id}/reviews`)
        .then((response) => response.json())
        .then((data) => {
          setRatings((prevRatings) => ({
            ...prevRatings,
            [restaurant._id]: parseInt(data.averageRating, 10) || "Not Rated",
          }));
        })
        .catch((error) => console.error("Error fetching ratings:", error));
    });
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch("http://localhost:8080/api/restaurants/");
      const data = await response.json();
      setRestaurants(data);
      fetchRatings(data);
    };

    console.log(restaurants);

    const fetchDiscounts = async () => {
      const response = await fetch(
        "http://127.0.0.1:8080/api/discountsPromotions/discounts"
      );
      const data = await response.json();
      setDiscounts(data);
    };

    fetchRestaurants().catch(console.error);
    fetchDiscounts().catch(console.error);
  }, []);

  useEffect(() => {
    setInitiallyFilteredRestaurants(
      restaurants.filter((restaurant) => {
        return (
          (!cuisineFirst || restaurant.cuisine === cuisineFirst) &&
          (!locationFirst ||
            restaurant.restaurantAddress.includes(locationFirst)) &&
          (!keywordFirst ||
            restaurant.restaurantName
              .toLowerCase()
              .includes(keywordFirst.toLowerCase()))
        );
      })
    );
  }, [restaurants, cuisineFirst, locationFirst, keywordFirst]); // Initial filter effect

  const applyFilters = (restaurant) => {
    const restaurantLocation = restaurant.restaurantAddress
      .split(",")[1]
      ?.trim();
    const matchesLocation = selectedFilters.location
      ? restaurantLocation === selectedFilters.location
      : true;
    const matchesCuisine = selectedFilters.cuisine
      ? restaurant.cuisine === selectedFilters.cuisine
      : true;
    const rating = ratings[restaurant._id];
    const matchesRating = selectedFilters.rating
      ? rating !== undefined && parseInt(rating, 10) === selectedFilters.rating
      : true;
    const discount = findDiscountForRestaurant(restaurant._id);
    const matchesDiscount = selectedFilters.discount
      ? discount === selectedFilters.discount
      : true;

    return (
      matchesLocation && matchesCuisine && matchesRating && matchesDiscount
    );
  };

  const findDiscountForRestaurant = (restaurantId) => {
    if (!Array.isArray(discounts)) {
      console.warn("Discounts is not an array", discounts);
      return 0;
    }
    const discount = discounts.find(
      (discount) => discount.restaurantID === restaurantId
    );
    return discount ? discount.discountPercentage : 0;
  };
  const handleFilterChange = (filter, value) => {
    let newValue;
    if (filter === "rating" || filter === "discount") {
      newValue = parseInt(value, 10);
      newValue = isNaN(newValue) ? 0 : newValue;
    } else {
      newValue = value;
    }

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: newValue,
    }));
  };

  const toggleFavorite = (restaurantId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [restaurantId]: !prevFavorites[restaurantId],
    }));
  };

  const showAllRestaurants = () => {
    setSelectedFilters({
      location: "",
      cuisine: "",
      rating: 0,
      discount: 0,
    });

    setInitiallyFilteredRestaurants(null);
  };

  const displayedRestaurants = initiallyFilteredRestaurants || restaurants;
  const filteredRestaurants = displayedRestaurants.filter(applyFilters);
  const uniqueCuisines = [
    ...new Set(restaurants.map((restaurant) => restaurant.cuisine)),
  ];
  const uniqueLocations = [
    ...new Set(
      restaurants.map((restaurant) =>
        restaurant.restaurantAddress.split(",")[1].trim()
      )
    ),
  ];

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
                    <p>{restaurant._id}</p>
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
