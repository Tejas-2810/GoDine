import React, { useEffect, useState, useRef } from "react";
import "./home.css";
import { Button } from "react-bootstrap";
import Slide from "../../components/slider/slide";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { isAxiosError } from 'axios';
import { useNavigate, createSearchParams } from "react-router-dom";

const Home = () => {
  const [cuisine, setCuisine] = useState("Any Cuisine");
  const [location, setLocation] = useState("Select Location");
  const [keyword, setKeyword] = useState("");
  const [topRestaurants, setTopRestaurants] = useState([]); 

  const navigate = useNavigate();
  const cancelRequestRef = useRef(null);
  
  useEffect(() => {
    
    cancelRequestRef.current?.abort();
    cancelRequestRef.current = new AbortController();
    const fetchTopRestaurants = async () => {
      try {
        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
        const server_port = process.env.REACT_APP_SERVER_PORT || "8080";
        const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants/toprestaurants";
      
        const endpoint = `${server_url}:${server_port}/${resturant_endpoint}`;
        const response = await axios.get(endpoint, { signal: cancelRequestRef.current?.signal, withCredentials: true })
        .then((response) => response)
        .catch((err) => err);

        setTopRestaurants(response.data);
      } catch (error) { 
        console.error("Error fetching restaurant data:",error);
      }
    };

    fetchTopRestaurants(); 

  }, []);
  
    const restaurantid = (id) => {
      navigate({
        pathname: "/reserve",
        search: createSearchParams({
          id : id,
        }).toString(),
      });
    };

  const topRestaurantsList = topRestaurants?.map((restaurant) => {
    return (
      <div className="col-md-4 mb-3 home-c " >
        <div className="card " onClick={() => restaurantid(restaurant._id)}>
          <img  className="img-top " alt="safdf" src={restaurant.photos[0]} />
          <div className="card-body">
            <div className="d-flex border-bottom">
            <h4 className="card-title m-0 col-9">{restaurant.restaurantName}</h4>
            <p> {restaurant.operatingHours}</p>
            </div>
            <p className="card-text m-0 p-0"><b>Address : </b>{restaurant.restaurantAddress}</p>
            <div className="d-flex"><p className="card-text "> <b>Cusine :    </b> {restaurant.cuisine} </p></div>
          </div>
        </div>
      </div>
    );
  });

  const redirect = () => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine,
        l: location,
        K: keyword,
      }).toString(),
    });
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisine(e.target.options[e.target.selectedIndex].text);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location === "0") {
      alert("Please select a valid location");
    } else {
      redirect();
    }
  };

  const handleBuffetClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: "Indian", // Directly set the cuisine to Indian
        l: location,
        K: keyword,
      }).toString(),
    });
  };

  const handleVegClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine, // Directly set the cuisine to Indian
        l: location,
        K: "Mirchi Tandoor",
      }).toString(),
    });
  };

  const handleMustVisitClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: "Italian", // Directly set the cuisine to Indian
        l: location,
        K: keyword,
      }).toString(),
    });
  };

  const handleHappyHoursClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine, // Directly set the cuisine to Indian
        l: location,
        K: "Tawa Grill",
      }).toString(),
    });
  };

  const handleNewRestaurantsClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine, // Directly set the cuisine to Indian
        l: location,
        K: "Marthas",
      }).toString(),
    });
  };

  const handleMeatestClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine, // Directly set the cuisine to Indian
        l: location,
        K: "Paradise Restaurant",
      }).toString(),
    });
  };

  const handleSeaFoodClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine, // Directly set the cuisine to Indian
        l: location,
        K: "Mehfil Restaurant",
      }).toString(),
    });
  };

  const handleVeganFoodClick = () => {
    // Directly navigate without updating the component state
    navigate({
      pathname: "/search",
      search: createSearchParams({
        c: cuisine, // Directly set the cuisine to Indian
        l: location,
        K: "Santosh Dhaba",
      }).toString(),
    });
  };

  return (
    <div className="hcontainer">
      <div className="bg1">
        <div className="container-sm hs">
          <div className="m-5 p-5 hs1">
            <form className="input-group bar my-5" onSubmit={handleSubmit}>
              <Button className="outline" variant="warning" type="submit">
                Search
              </Button>
              <input
                type="text"
                className="form-control form-control-h"
                placeholder="Search Restaurants or Food. . . ."
                aria-label="Input group example"
                aria-describedby="basic-addon1"
                onChange={handleKeywordChange}
              />
              <select
                className="form-select form-select-h"
                aria-label="Select Cuisine"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.336)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  borderRadius: "1rem",
                }}
                onChange={handleCuisineChange}
              >
                <option>Any Cuisine</option>
                <option>Italian</option>
                <option>Mexican</option>
                <option>Chinese</option>
                <option>Indian</option>
              </select>
              <select
                className="form-select form-select-h"
                aria-label="Select Location"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.336)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  borderRadius: "1rem",
                }}
                onChange={handleLocationChange}
              >
                <option value="0">Select Location</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </form>
            <p className="quote text-center" style={{ fontSize: "3vw" }}>
              “One cannot think well, love well, sleep well, if one has not
              dined well.”{" "}
            </p>
          </div>
        </div>
      </div>
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h3 className="mb-3">Top Restaurants This Month</h3>
            </div>
            <div className="col-12">
              <div className="row">
                {topRestaurantsList}  
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 my-3 ">
                <div
                  className="card border  border-3 border-warning rounded-lg shadow-lg type"
                  onClick={handleBuffetClick} // Using the new function here
                >
                  <div className="card-body  d-flex flex-row">
                    <div>
                      <h5 className="card-title">Buffet</h5>
                      <p className="card-text">
                        Enjoy a wide variety of dishes. With no limitations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleVegClick}
                  >
                    <div>
                      <h5 className="card-title">Pure Veg</h5>
                      <p className="card-text">
                        Experience the best vegetarian cuisine from around your
                        beauriful city.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleMustVisitClick}
                  >
                    <div>
                      <h5 className="card-title">Must Visit</h5>
                      <p className="card-text">
                        Discover the must-visit restaurants in our city at a
                        discounted rate (Special Offer)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleHappyHoursClick}
                  >
                    <div>
                      <h5 className="card-title">Happy Hours</h5>
                      <p className="card-text">
                        Enjoy your Happy Hours with a beautiful Downtown View at
                        Tawa Grill and other similar restaurants
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleNewRestaurantsClick}
                  >
                    <div>
                      <h5 className="card-title">New Restaurants</h5>
                      <p className="card-text">
                        Explore the latest addition of restaurants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleMeatestClick}
                  >
                    <div>
                      <h5 className="card-title">Meat Fest</h5>
                      <p className="card-text">
                        Experience with a variety of meats at our new place at
                        discounted price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleSeaFoodClick}
                  >
                    <div>
                      <h5 className="card-title">Sea Food</h5>
                      <p className="card-text">
                        Treat yourself to Freshly prepared seafood from the
                        ocean at Mehfil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div
                    className="card-body d-flex flex-row"
                    onClick={handleVeganFoodClick}
                  >
                    <div>
                      <h5 className="card-title">Vegan</h5>
                      <p className="card-text">
                        Discover the benefits of a plant-based diet with Dhaba
                        Style twist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div className="container slide">
        <h2>Featured Restaurant</h2>
        <Slide />
      </div>
    </div>
  );
};

export default Home;
