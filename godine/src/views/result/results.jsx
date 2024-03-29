import React from "react";
import { useState, useEffect } from "react";
import "./results.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSearchParams } from "react-router-dom";

const Results = () => {
  const [searchParams] = useSearchParams();
  let cuisine = searchParams.get("c" || "");
  if (cuisine == "Any Cuisine") {
    cuisine = "";
  }
  let location = searchParams.get("l" || "");
  if (location == "Select Location") {
    location = "";
  }
  let keyword = searchParams.get("K" || "");

  console.log("Cuisine:", cuisine, "Location:", location, "Keyword:", keyword);
  const [data, setData] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(-1);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedCuisine, setSelectedCuisine] = useState(cuisine);
  const [selectedRating, setSelectedRating] = useState("");

  const [fil_data, setFil_data] = useState([]);

  useEffect(() => {
    const fetchRestDetails = async () => {
      const fetchRestUrl = `http://127.0.0.1:3000/api/restaurants/`;

      try {
        const response = await fetch(fetchRestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setData(data);
        console.log(cuisine, location, keyword);

        const filteredData = data.filter(
          (restaurant) =>
            restaurant.restaurantName
              .toLowerCase()
              .includes(keyword.toLowerCase()) &&
            restaurant.restaurantAddress
              .toLowerCase()
              .includes(location.toLowerCase()) &&
            restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())
        );

        setFil_data(filteredData);
      } catch (error) {
        console.error("Failed to fetch restaurant details:", error);
      }
    };

    fetchRestDetails();
  }, [cuisine, location, keyword]);

  //   const handleDiscountSelection = (value) => {
  //     setSelectedDiscounts((prevDiscounts) => {
  //       // If the value is already in the array, remove it, otherwise add it
  //       return prevDiscounts.includes(value)
  //         ? prevDiscounts.filter((discount) => discount !== value)
  //         : [...prevDiscounts, value];
  //     });
  //   };

  //   const toggleDiscount = (discount) => {
  //     setSelectedDiscount((currentDiscounts) =>
  //       currentDiscounts.includes(discount)
  //         ? currentDiscounts.filter((d) => d !== discount)
  //         : [...currentDiscounts, discount]
  //     );
  //   };

  const handleLocationSelection = (value) => {
    setSelectedLocation(value);
  };

  const handleCuisineSelection = (value) => {
    setSelectedCuisine(value);
  };

  const handleRatingSelection = (value) => {
    setSelectedRating(value);
  };
  const applyFilters = () => {
    const filteredData = data.filter((restaurant) => {
      return (
        restaurant.restaurantAddress
          .toLowerCase()
          .includes(selectedLocation.toLowerCase()) &&
        restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
      );
    });

    setFil_data(filteredData); // Update the state with filtered data
    console.log("Filters applied");
  };

  return (
    <div className="container cb">
      <section>
        <div className="row">
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="discountDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Discounts
              </button>
              <div className="dropdown-menu" aria-labelledby="discountDropdown">
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedDiscount("10")}
                >
                  10%
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedDiscount("20")}
                >
                  20%
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedDiscount("30")}
                >
                  30%
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="locationDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Location
              </button>
              <div className="dropdown-menu" aria-labelledby="locationDropdown">
                <button
                  className="dropdown-item"
                  onClick={() => handleLocationSelection("New York")}
                >
                  New York
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleLocationSelection("London")}
                >
                  London
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleLocationSelection("Halifax")}
                >
                  Halifax
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="cuisineDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cuisine
              </button>
              <div className="dropdown-menu" aria-labelledby="cuisineDropdown">
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedCuisine("Italian")}
                >
                  Italian
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedCuisine("Mexican")}
                >
                  Mexican
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedCuisine("Chinese")}
                >
                  Chinese
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="ratingsDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Ratings
              </button>
              <div className="dropdown-menu" aria-labelledby="ratingsDropdown">
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedRating("1")}
                >
                  1
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedRating("2")}
                >
                  2
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedRating("3")}
                >
                  3
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedRating("4")}
                >
                  4
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedRating("5")}
                >
                  5
                </button>
              </div>
              <div className="apply-button-container">
                <button onClick={applyFilters} className="btn btn-primary">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {fil_data.map((restaurant, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-3">
                  <img
                    src="p1.jpej"
                    className="card-img-top"
                    alt={restaurant.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.restaurantName}</h5>
                    <p className="m-0">{restaurant.description}</p>
                    <p className="m-0">Discount: 10%</p>
                    <p className="m-0">
                      Location: {restaurant.restaurantAddress}
                    </p>
                    <p className="m-0">Cuisine: {restaurant.cuisine}</p>
                    <p className="m-0">Ratings: 3</p>
                    <button className="btn btn-primary">Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
