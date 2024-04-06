import React, {useEffect, useState} from "react";
import "./discounts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Discounts = () => {
    const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
    const {getUserId} = useAuth();
    const userId = getUserId();
    const [discounts, setDiscounts] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({});

    const [initiallyFilteredRestaurants, setInitiallyFilteredRestaurants] =
    useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
      location: "",
      cuisine: "",
      rating: 0,
      discount: 0,
    });
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const endpoint = `${server_url}/discounts`;
                const response = await axios.get(endpoint);
                setDiscounts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching discounts:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchDiscounts();
    }, [server_url]);
    const displayedRestaurants = initiallyFilteredRestaurants || restaurants;

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
      const filteredRestaurants = displayedRestaurants.filter(applyFilters);
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
    
    return (
        <div className="pcontainer discounts-container d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">Discounts and Promotions</h1>
        <form class="form-inline my-lg-0 my-3">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        </div>
        
        <div className="filter-panel my-3 d-flex">
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
          <div className="filter-group filter-d">
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
          <div className="filter-group filter-d">
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
          <div className="filter-group filter-d">
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
        <div className="cards home-c d-cards glass text-white">
        <div className="p-3">
          <div className="d-flex">
            <h3 className="card-title m-0">Discount Name</h3>
          </div>
          <div className="d-flex flex-column my-3 p-0">
          <p className="">
            <b>Discoutn : 50% </b>
            {}
          </p>
            <p className="">
              <b>Code: ABC-XYZ</b> {}{" "}
            </p>
            <p className="">
              <b>Expiry: ABC-XYZ</b> {}{" "}
            </p>
          </div>
            <div className="text-center">
            <button className="btn btn-success">Copy Code</button>
            </div>
        </div>
      </div>
        </div>
    );
}

export default Discounts;