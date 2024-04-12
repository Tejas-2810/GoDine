import React, { useEffect, useState } from "react";
import "./discounts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Discounts = () => {
  const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
  const [discounts, setDiscounts] = useState([]);
  const [discountsAndPromotions, setDiscountsAndPromotions] = useState([]);

  const [selectedOption, setSelectedOption] = useState("all");

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const endpoint = `${server_url}/api/discounts`;
        const response = await axios.get(endpoint);
        let discounts = response.data.map((discount) => { discount.type = "Discount"; return discount; });

        console.log("discounts: ", discounts);
        setDiscountsAndPromotions(discounts);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, [server_url]);

  const handleCheckSelection = (e) => {
    setSelectedOption(e.target.value);
  }

  const copyCode = (text) => {
    console.log("Copying code:", text);
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="pcontainer discounts-container d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">Discounts and Promotions</h1>
        <form className="form-inline my-lg-0 my-3">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>

        <div className="d-flex">
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

      {/* <div className="cards home-c d-cards glass text-white">
        <div className="p-3">
          <div className="d-flex">
            <h3 className="card-title m-0">Discount Name</h3>
          </div>
          <div className="d-flex flex-column my-3 p-0">
            <p className="">
              <b>Discount : 50% </b>
              { }
            </p>
            <p className="">
              <b>Code: ABC-XYZ</b> { }{" "}
            </p>
            <p className="">
              <b>Expiry: ABC-XYZ</b> { }{" "}
            </p>
          </div>
          <div className="text-center">
            <button className="btn btn-success">Copy Code</button>
          </div>
        </div>
        </div> */}

      {
        // discounts section
        <section>
          <div className="row">
            {
              discountsAndPromotions.map((discount, idx) => {
                if (selectedOption === "all" || discount.type.toLowerCase() === selectedOption.toLowerCase()) {
                  return (
                    <div key={idx} className="col-sm-4 my-5">
                      <div className="cards items-c d-cards glass text-white">
                        <div className="p-3">
                          <div className="d-flex">
                            <h3 className="card-title m-0">{discount.name}</h3>
                          </div>
                          <div className="d-flex flex-column my-3 p-0">
                            <p className="">
                              <b>Discount : {discount.discountPercentage}%</b>
                              { }
                            </p>
                            <p className="">
                              <b>Code: {discount.code}</b>
                            </p>
                            <p className="">
                              <b>Expiry: {(new Date(discount.expiry)).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</b>
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
                  );
                }
              })}
          </div>
        </section>
      }

      {
        // promotions section
        (selectedOption === "promotions") && null
      }
    </div>
  );
}

export default Discounts;