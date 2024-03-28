import React from "react";
import { useState, useEffect } from "react";
import "./results.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSearchParams } from "react-router-dom";

const Results = () => {
  function filterRestaurants(data, rest_name, rest_loc, rest_cuis) {
    if (
      data.restaurantName == rest_name &&
      data.restaurantAddress == rest_loc &&
      data.restaurantCuisine == rest_cuis
    ) {
      return true;
    }
  }

  const [data, setData] = useState([]);

  const [searchParams] = useSearchParams();
  const cuisine = searchParams.get("c");
  const location = searchParams.get("l");
  const keyword = searchParams.get("K");

  console.log("Cuisine:", cuisine, "Location:", location, "Keyword:", keyword);

  let user_id = "65fb4b3b2519c4ffea8d5fa0";

  const [fil_data, setFil_data] = useState([]);
  useEffect(() => {
    const fetchRestDetails = async () => {
      const fetchRestUrl = `http://127.0.0.1:3000/api/restaurants/`;
      console.log("Fetching details for:", cuisine, location, keyword);

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
        console.log("DATA RA REY", data);

        // Create a new array to store the filtered data
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

        // Update the state with the new filtered data
        setFil_data(filteredData);
      } catch (error) {
        console.error("Failed to fetch restaurant details:", error);
      }
    };

    fetchRestDetails();
  }, [cuisine, location, keyword]);

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
                <div>
                  <input type="checkbox" id="discount-10" value="10" />
                  <label htmlFor="discount-10">10%</label>
                </div>
                <div>
                  <input type="checkbox" id="discount-20" value="20" />
                  <label htmlFor="discount-20">20%</label>
                </div>
                <div>
                  <input type="checkbox" id="discount-30" value="30" />
                  <label htmlFor="discount-30">30%</label>
                </div>
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
                <a className="dropdown-item">New York</a>
                <a className="dropdown-item">London</a>
                <a className="dropdown-item">Halifax</a>
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
                <a className="dropdown-item">Italian</a>
                <a className="dropdown-item">Mexican</a>
                <a className="dropdown-item">Chinese</a>
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
                <a className="dropdown-item">1</a>
                <a className="dropdown-item">2</a>
                <a className="dropdown-item">3</a>
                <a className="dropdown-item">4</a>
                <a className="dropdown-item">5</a>
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
