import React, { useState } from "react";
import "./home.css";
import { Button } from "react-bootstrap";
import Slide from "../../components/slider/slide";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, createSearchParams } from "react-router-dom";

const Home = () => {
  const [cuisine, setCuisine] = useState("Any Cuisine");
  const [location, setLocation] = useState("Select Location");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

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
              <h3 className="mb-3">Top Resturants This Month</h3>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      className="img-fluid"
                      alt="safdf"
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23"
                    />
                    <div className="card-body">
                      <h4 className="card-title">Beach Restautrent</h4>
                      <p className="card-text">
                        Enjoy the beach as you eat, with a beautiful sunset.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      className="img-fluid"
                      alt="100%x280"
                      src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129"
                    />
                    <div className="card-body">
                      <h4 className="card-title">Sunset</h4>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      className="img-fluid"
                      alt="100%x280"
                      src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=5ee4fd5d19b40f93eadb21871757eda6"
                    />
                    <div className="card-body">
                      <h4 className="card-title">Hills</h4>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Buffet</h5>
                      <p className="card-text">
                        Enjoy a wide variety of dishes. With no limitaitons
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Pure Veg</h5>
                      <p className="card-text">
                        Experience the best vegetarian cuisine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Must Visit</h5>
                      <p className="card-text">
                        Discover the must-visit restaurants in our city.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Happy Hours</h5>
                      <p className="card-text">
                        Enjoy special discounts and offers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">New Restaurants</h5>
                      <p className="card-text">
                        Explore the latest additions of restaurant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Meat Fest</h5>
                      <p className="card-text">
                        Experience with a variety of meats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Sea Food</h5>
                      <p className="card-text">
                        Treat yourself to seafood from the ocean.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card border border-3 border-warning rounded-lg shadow-lg type">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title">Vegan</h5>
                      <p className="card-text">
                        Discover the benefits of a plant-based diet.
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
