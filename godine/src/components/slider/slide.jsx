import i1 from '../../images/bg.png';
import i2 from '../../images/bg1.png';
import i3 from '../../images/bg2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./slide.css"
import axios, { isAxiosError } from 'axios';
import React, { useEffect, useState, useRef } from "react";

const Slide = () => {
  const [latestRestaurants, setLatestRestaurants] = useState([]);
    const cancelRequestRef = useRef(null);

  useEffect(() => {
    
    cancelRequestRef.current?.abort();
    cancelRequestRef.current = new AbortController();

    const fetchLatestRestaurants = async () => {
      try {
        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
        const server_port = process.env.REACT_APP_SERVER_PORT || "8080";
        const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants/topseatingrestaurants";
        const endpoint = `${server_url}:${server_port}/${resturant_endpoint}`;
        const response = await axios.get(endpoint, { signal: cancelRequestRef.current?.signal, withCredentials: true })
        .then((response) => response)
        .catch((err) => err);

        setLatestRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:",error);
      }
    };

    fetchLatestRestaurants();

    console.log("Top Restaurants:", latestRestaurants[0]);

  }, []);

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 40 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30 // optional, default to 1.
    }
  };
return(
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
      min: 1024
    },
    items: 3,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
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
  <div className="card home-c">
        <div className="card">
            <img className="img-bottom" alt="Card image" src={latestRestaurants[0].photos[0]} />
        </div>
        <div className="card-body">
            <div className="d-flex">
            <h5 className="card-title m-0">{latestRestaurants[0].restaurantName}</h5>
            </div>
            <p className="card-text "><b>Address : </b>{latestRestaurants[0].restaurantAddress}</p>
            <div className="d-flex"><p className="card-text "> <b>Cusine :    </b> {latestRestaurants[0].cuisine} </p></div>
          </div>
      </div>
  <div className="card home-c">
        <div className="card">
            <img className="img-bottom" alt="Card image" src={latestRestaurants[1].photos[0]} />
        </div>
        <div className="card-body">
            <div className="d-flex">
            <h5 className="card-title m-0">{latestRestaurants[1].restaurantName}</h5>
            </div>
            <p className="card-text "><b>Address : </b>{latestRestaurants[1].restaurantAddress}</p>
            <div className="d-flex"><p className="card-text "> <b>Cusine :    </b> {latestRestaurants[1].cuisine} </p></div>
          </div>
      </div>
  <div className="card home-c">
        <div className="card">
            <img className="img-bottom" alt="Card image" src={latestRestaurants[2].photos[0]} />
        </div>
        <div className="card-body">
            <div className="d-flex">
            <h5 className="card-title m-0">{latestRestaurants[2].restaurantName}</h5>
            </div>
            <p className="card-text "><b>Address : </b>{latestRestaurants[2].restaurantAddress}</p>
            <div className="d-flex"><p className="card-text "> <b>Cusine :    </b> {latestRestaurants[2].cuisine} </p></div>
          </div>
      </div>
  <div className="card home-c">
        <div className="card">
            <img className="img-bottom" alt="Card image" src={latestRestaurants[3].photos[0]} />
        </div>
        <div className="card-body">
            <div className="d-flex">
            <h5 className="card-title m-0">{latestRestaurants[3].restaurantName}</h5>
            </div>
            <p className="card-text "><b>Address : </b>{latestRestaurants[3].restaurantAddress}</p>
            <div className="d-flex"><p className="card-text "> <b>Cusine :    </b> {latestRestaurants[3].cuisine} </p></div>
          </div>
      </div>
  <div className="card home-c">
        <div className="card">
            <img className="img-bottom" alt="Card image" src={latestRestaurants[4].photos[0]} />
        </div>
        <div className="card-body">
            <div className="d-flex">
            <h5 className="card-title m-0">{latestRestaurants[4].restaurantName}</h5>
            </div>
            <p className="card-text "><b>Address : </b>{latestRestaurants[4].restaurantAddress}</p>
            <div className="d-flex"><p className="card-text "> <b>Cusine :    </b> {latestRestaurants[4].cuisine} </p></div>
          </div>
      </div>


</Carousel>
);
};

export default Slide;