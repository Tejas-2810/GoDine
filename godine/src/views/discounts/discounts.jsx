import React, { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./discounts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Discounts = () => {
  const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
  const [discounts, setDiscounts] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [selectedOption, setSelectedOption] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchDiscountsAndPromotions = async () => {
      try {
        const endpoint = `${server_url}/api/discounts`;
        const response = await axios.get(endpoint);
        let discounts = response.data.map((discount) => { discount.type = "Discount"; return discount; });

        console.log("discounts: ", discounts);
        setDiscounts(discounts);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }

      try {
        const endpoint = `${server_url}/api/promotions`;
        const response = await axios.get(endpoint);
        let promotions = response.data.map((promotion) => { promotion.type = "Promotion"; return promotion; });

        console.log("promotions: ", promotions);
        setPromotions(promotions);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }

    }

    fetchDiscountsAndPromotions();
  }, [server_url]);

  const handleCheckSelection = (e) => {
    setSelectedOption(e.target.value);
  }

  // to copy discount code to clipboard
  const copyCode = (text) => {
    console.log("Copying code:", text);
    navigator.clipboard.writeText(text);
  }


  const handleReserveButton = (restaurant) => {
    navigate({
      pathname: "/reserve",
      search: createSearchParams({
        id: restaurant._id,
      }).toString(),
    });
  }

  return (
    <div className="pcontainer discounts-container d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">Discounts and Promotions</h1>
        <form className="form-inline my-lg-0 my-3">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>

        <div className="d-flex my-2">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="all" checked={selectedOption === "all"} onChange={(e) => handleCheckSelection(e)} id="allCheck"></input>
            <label className="form-check-label" htmlFor="allCheck">All</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="discount" checked={selectedOption === "discount"} onChange={(e) => handleCheckSelection(e)} id="discountCheck"></input>
            <label className="form-check-label" htmlFor="discountCheck">Discounts Only</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" value="promotion" checked={selectedOption === "promotion"} onChange={(e) => handleCheckSelection(e)} id="promotionCheck"></input>
            <label className="form-check-label" htmlFor="promotionCheck">Promotions Only</label>
          </div>
        </div>
      </div>

      <section>
        <div className="row">
          {
            // discounts section
            (selectedOption === "all" || selectedOption === "discount") &&
            discounts.map((discount, idx) => (
              <div key={idx} className="col-sm-4 my-5">
                <div className="cards items-c d-cards glass text-white">
                  <div className="p-3">
                    <div className="d-flex">
                      <h3 className="card-title m-0">{discount.name}</h3>
                    </div>
                    <div className="d-flex flex-column my-3 p-0">
                      <p>
                        {discount.description}
                      </p>
                      <p className="">
                        Discount : {discount.discountPercentage}%
                      </p>
                      <p className="">
                        Code: {discount.code}
                      </p>
                      <p className="">
                        Expiry: {(new Date(discount.expiry)).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                      <span className="badge badge-pill bg-dark">
                        {discount.type}
                      </span>
                    </div>
                    <div className="text-center">
                      <button className="btn btn-success" onClick={() => copyCode(discount.code)}>Copy Code</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

          {
            // promotions section
            (selectedOption === "all" || selectedOption === "promotion") &&
            promotions.map((promotion, idx) => (
              <div key={idx} className="col-sm-4 my-5">
                <div className="cards items-c d-cards glass text-white">
                  <div className="p-3">
                    <div className="d-flex">
                      <h3 className="card-title m-0">{promotion.name}</h3>
                    </div>
                    <div className="d-flex flex-column my-3 p-0">
                      <p>
                        Description: {promotion.description}
                      </p>
                      <p>
                        Until: {(new Date(promotion.until)).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                      <p>
                        <b>Restaurant: {promotion.restaurant.restaurantName}</b>
                      </p>
                      <span className="badge badge-pill bg-dark">
                        {promotion.type}
                      </span>
                    </div>
                    <div className="text-center">
                      <button className="btn btn-success" onClick={() => handleReserveButton(promotion.restaurant)}>Make reservation</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default Discounts;