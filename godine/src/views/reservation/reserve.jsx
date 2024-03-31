import React,{useEffect, useState, useRef} from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "./reserve.css";
import useAuth from '../../hooks/useAuth';
import axios, { isAxiosError } from 'axios';
const Reserve = () => {
    const { getUserId } = useAuth();
    const cancelRequestRef = useRef(null);

    const [restaurantData, setRestaurantData] = useState(null);
    const [reviewData, setReviewData] = useState(null);

    useEffect(() => {
        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
        const server_port = process.env.REACT_APP_SERVER_PORT || "8080";
        const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants";
        const restaurantId = "66039bdae52ec6b12a61a43a";
        const review = "reviews";
        const userId = getUserId();

        const endpoint = `${server_url}:${server_port}/${resturant_endpoint}/${restaurantId}`;

        cancelRequestRef.current?.abort();
        cancelRequestRef.current = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint, { signal: cancelRequestRef.current?.signal, withCredentials: true })
                .then((response) => response)
                .catch((err) => err);

                setRestaurantData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        const fetchReview = async () => {
            try {
                const response = await axios.get(`${endpoint}/${review}`, { signal: cancelRequestRef.current?.signal, withCredentials: true })
                .then((response) => response)
                .catch((err) => err);
                setReviewData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        fetchReview();
        fetchData();
    }, []);

    if (restaurantData) {
        const {
            features,
            restaurantName,
            restaurantAddress,
            pricing,
            cuisine,
            operatingHours,
            contactNumber,
            seatingCapacity,
            menu,
            photos
        } = restaurantData;

        // Use the variables above in your JSX code
        // Example: <h1>{restaurantName}</h1>
        console.log("Restaurant Data: ", restaurantName);
    }
    var reviewList = [];
    if (reviewData) {
 
        const {
            averageRating,
            reviewCount,
            reviews
        } = reviewData;
        reviewList = reviews;


        // Use the variables above in your JSX code
        // Example: <h1>{restaurantName}</h1>
        console.log("Review Data: ", reviews);
        console.log("Review Data: ", averageRating);
        console.log("Review Data: ", reviewCount);


    }
    if (reviewList) {
        reviewList.forEach((review) => {
            if (review.userID && review.userID.name) {
                console.log("Name:", review.userID.name);
            }
        });
    }

    const reviewdisplay = reviewList.map((reviewList) => {
        return (
            <div class="collapse multi-collapse" id="multiCollapseExample2">
                <div class="card-body">
                    <h5 class="card-title">{reviewList.userID?.name}</h5>
                    <p class="card-text">{reviewList.review}</p>
                </div>
            </div>


        );
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name: e.target.nameInput.value,
                email: e.target.emailInput.value,
                phone: e.target.phoneInput.value,
                date: e.target.dateInput.value,
                time: e.target.timeInput.value,
                guests: parseInt(e.target.guests.value)
            };
            const reservationData = {
                restaurantID: "660345d96a5e6f56688098a6",
                userID: "65fb4b3b2519c4ffea8d5fa0",
                reservationDate: formData.date,
                reservationTime: formData.time,
                noOfGuests: formData.guests
            };
            console.log(reservationData);
            await axios.post("http://localhost:8080/api/user-reservation/book", reservationData, { withCredentials: true });
            alert("Reservation created successfully!");
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Error creating reservation. Please try again.");
        }
    };
    return (
        <div className="pcontainer container ">
            <div className="row" >
                <div className="container col-md-6">
                    <Card className="card-reserve">
                        <Card.Body  className="cbody">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://foodchannel.com/wp-content/uploads/sites/78/2017/06/mercadito_0968.jpg?w=1200"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg"
                                        alt="Second slide"
                                    />
                                    <Carousel.Caption>
                                       
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://www.birchrestaurant.com/wp-content/uploads/2022/03/The-Regent-Cocktail-Club.jpg"
                                        alt="Third slide"
                                    />
                                    <Carousel.Caption>
                                        
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                            {/* {images.map((image, index) => ( */}
                                <img
                                    key={1}
                                    className="d-block menu"
                                    src={ 'https://www.birchrestaurant.com/wp-content/uploads/2022/03/The-Regent-Cocktail-Club.jpg '}
                                    alt={`Slide ${1 + 1}`}
                                />
                            {/* ))} */}
                        </Card.Body>
                        <Card.Footer className="cfooter d-flex-column">
                            <div className="d-flex ">
                            {restaurantData && <h3 className="col-10 my-2">{restaurantData.restaurantName}</h3>}
                                <div className="col-2 text-center">
                                {reviewData && <button disabled className="btn btn-success"> {reviewData.averageRating.toFixed(1)} </button>}
                                    {/* <p>56 <i>reviews</i></p> */}
                                </div>
                            </div>

                                <div className=" container my-4">
                                {restaurantData && <p>Address: {restaurantData.restaurantAddress }</p>  }
                                {restaurantData && <p>Phone: {restaurantData.contactNumber}</p> }
                                {restaurantData && <p>Operating Hours: {restaurantData.operatingHours}</p> }
                                {restaurantData && <p>Seating Capacity: {restaurantData.seatingCapacity}</p> }
                                {restaurantData && <p>Cuisine: {restaurantData.cuisine}</p> }
                                {restaurantData && <p>Pricing: {restaurantData.pricing}</p> }
 

                                </div>
                                {/* <div className="col-4 text-center m-auto">
                                    <button className="btn btn-primary">Menu</button>
                                    <button className="btn btn-primary">Review</button>
                                    <button className="btn btn-primary">Overview</button>
                                </div> */}
                            
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col-md-4">
                    <form className="m-5 fcontainer " onSubmit={handleSubmit}>
                        <h4 className="text-center text-capitalize">Reservation Form</h4>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" className="form-control" id="nameInput" placeholder="Enter name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="Enter email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneInput">Phone</label>
                            <input type="number" className="form-control" id="phoneInput" placeholder="Enter phone" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateInput">Date</label>
                            <input type="date" className="form-control text-center" id="dateInput" placeholder="Enter date" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeInput">Time</label>
                            <input type="time" className="form-control text-center" id="timeInput" placeholder="Enter time" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guestsInput">Number of guests (max 5)</label>
                            <div className="dropdown">
                                <select class="form-select text-center" id="guests" aria-label="Example select with button addon" required>
                                    <option selected>None</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                    <option value="5">Five</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-5 text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </form>
                </div>
            </div>

            <div className="review">

                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                    Ratings & Reviews
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" >Reviews</button>
                    </div>
                    <div className="">
                    </div>
                    {reviewdisplay}
                </div>
            </div>
        </div>
    );
}

export default Reserve;
