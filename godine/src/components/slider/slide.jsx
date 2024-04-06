import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./slide.css";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

const Slide = () => {
  const [latestRestaurants, setLatestRestaurants] = useState([]);
  const cancelRequestRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    cancelRequestRef.current?.abort();
    cancelRequestRef.current = new AbortController();

    const fetchLatestRestaurants = async () => {
      try {
        const server_url =
          process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
        const resturant_endpoint =
          process.env.REACT_APP_PROFILE_ENDPOINT ||
          "api/restaurants/topseatingrestaurants";
        const endpoint = `${server_url}/${resturant_endpoint}`;
        const response = await axios
          .get(endpoint, {
            signal: cancelRequestRef.current?.signal,
          })
          .then((response) => response)
          .catch((err) => err);

        setLatestRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchLatestRestaurants();


  }, []);

  const restaurantid = (id) => {
    navigate({
      pathname: "/reserve",
      search: createSearchParams({
        id : id,
      }).toString(),
    });
  };
    

  const latestrestarants = latestRestaurants?.map((restaurant) => {
    return (
      <div className="cards home-c" onClick={() => restaurantid(restaurant._id)}>
        <div className="" >
          <img
            className="img-bottom"
            alt="Card image"
            src={restaurant.photos[0]}
          />
        </div>
        <div className="p-3">
          <div className="d-flex">
            <h5 className="card-title m-0">{restaurant.restaurantName}</h5>
          </div>
          <p className="">
            <b>Address : </b>
            {restaurant.restaurantAddress}
          </p>
          <div className="d-flex m-0 p-0">
            <p className="">
              <b>Cusine : </b> {restaurant.cuisine}{" "}
            </p>
          </div>
        </div>
      </div>
    );
  });

  // var data = latestRestaurants[3];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 40, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30, // optional, default to 1.
    },
  };
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={1000}
      centerMode={true}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {latestrestarants}
      {/* <div className="cards home-c">
        <div className="">
          <img
            className="img-bottom"
            alt="Card image"
            src={data.photos[0]}
          />
        </div>
        <div className="p-3">
          <div className="d-flex">
            <h5 className="card-title m-0">{data.restaurantName}</h5>
          </div>
          <p className="">
            <b>Address : </b>
            {data.restaurantAddress}
          </p>
          <div className="d-flex m-0 p-0">
            <p className="">
              <b>Cusine : </b> {data.cuisine}{" "}
            </p>
          </div>
        </div>
      </div> */}
      <div></div>
    </Carousel>
  );
};

export default Slide;
