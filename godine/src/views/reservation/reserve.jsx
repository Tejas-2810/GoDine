import React,{useEffect, useState, useRef} from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./reserve.css";
import useAuth from '../../hooks/useAuth';
import axios, { isAxiosError } from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const Reserve = () => {
    const { getUserId } = useAuth();
    const cancelRequestRef = useRef(null);
    const [searchParams] = useSearchParams();
    const [restaurantData, setRestaurantData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const userId = getUserId();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
        const server_port = process.env.REACT_APP_SERVER_PORT || "8080";
        const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants";
        const restaurantId = searchParams.get("id") || "660345d96a5e6f56688098a6";
        const review = "reviews";

        const endpoint = `${server_url}:${server_port}/${resturant_endpoint}/${restaurantId}`;

        cancelRequestRef.current?.abort();
        cancelRequestRef.current = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint, { signal: cancelRequestRef.current?.signal, withCredentials: true })
                .then((response) => response)
                .catch((err) => err);

                setRestaurantData(response.data);
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
    var pics = []
    var menupics = []
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
        pics = photos
        menupics = menu
    }
    var reviewList = [];
    if (reviewData) {
 
        const {
            averageRating,
            reviewCount,
            reviews
        } = reviewData;
        reviewList = reviews;

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
                <div class=" card card-body">
                    <div className="border-bottom d-flex align-items-center">
                    <h3 class=" mx-3 my-1"><i class="bi bi-person-circle"></i></h3>
                    <h4 class="card-title ">{reviewList.userID?.name}</h4>
                    </div>
                    <p class="card-text review-text my-3">{reviewList.review}</p>
                </div>
            </div>
        );
    })

    const [show, setShow] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);

    const handleShow = (imgSrc) => {
        setSelectedImg(imgSrc);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const respics = pics.map((pics) =>{
        return(
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={pics}
                alt="Resturant images"
            />
            <Carousel.Caption>
                
            </Carousel.Caption>
        </Carousel.Item>
        )
    
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
                restaurantID: searchParams.get("id") || "660345d96a5e6f56688098a6",
                userID: userId || "65fb4b3b2519c4ffea8d5fa0",
                reservationDate: formData.date,
                reservationTime: formData.time,
                noOfGuests: formData.guests
            };
            await axios.post("http://localhost:8080/api/user-reservation/book", reservationData, { withCredentials: true });
            
            alert("Reservation created successfully!");
            navigate('/history');

        } catch (error) {
            console.error("Error creating reservation:", error);
            if(isAxiosError(error)){
                if(error.response.status === 400){
                    alert("Please provide all required fields.");
                }
                else if(error.response.status === 401 || error.response.status === 403){
                    alert("Please login to create a reservation.");
                    // navigate("/signin", {state: {from: location}, replace: true});
                }
                return;
            }
            alert("Error creating reservation. Please try again.");
            
        }
    };
    return (
        <div className="pcontainer container ">
            <div className="row" >
                <div className="container col-md-6">
                    <Card className="card-reserve">
                        <Card.Body  className="cbody">
                            <Carousel className=" border-bottom">
                                {respics}
                            </Carousel>
                            <div className="d-flex">
                            {menupics.map((menupics, index) => (
                                <img
                                    key={1}
                                    className="menu mx-3"
                                    src={menupics}
                                    alt={`Slide ${index + 1}`}
                                    onClick={() => handleShow(menupics)}
                                />
                            ))} 
                            </div>
                        </Card.Body>
                        <Card.Footer className="cfooter d-flex-column text-white">
                            <div className="d-flex border-bottom ">
                            {restaurantData && <h3 className="col-10 my-2">{restaurantData.restaurantName}</h3>}
                                <div className="col-2 text-center">
                                {reviewData && <button className="btn rating btn-success"> {reviewData.averageRating.toFixed(1)} </button>}
                                    {/* <p>56 <i>reviews</i></p> */}
                                </div>
                            </div>

                                <div className=" container my-4">
                                {restaurantData && <p> <b>Address: </b>{restaurantData.restaurantAddress }</p>  }
                                {restaurantData && <p> <b>Phone:</b> {restaurantData.contactNumber}</p> }
                                {restaurantData && <p> <b>Operating Hours:</b> {restaurantData.operatingHours}</p> }
                                {restaurantData && <p> <b>Seating Capacity:</b> {restaurantData.seatingCapacity}</p> }
                                {restaurantData && <p> <b>Cuisine: </b>{restaurantData.cuisine}</p> }
                                {restaurantData && <p> <b>Pricing:</b> {restaurantData.pricing}</p> }
 

                                </div>
                                {/* <div className="col-4 text-center m-auto">
                                    <button className="btn btn-primary">Menu</button>
                                    <button className="btn btn-primary">Review</button>
                                    <button className="btn btn-primary">Overview</button>
                                </div> */}
                            
                        </Card.Footer>
                    </Card>
                </div>
                <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Body>
                    <img src={selectedImg} className="w-100" alt="Menu" />
                </Modal.Body>
               </Modal>
                <div className="col-md-4 mx-5">
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

            <div className="review mx-5">

                <div class="card mx-5">
                    <div class="card-header d-flex justify-content-between align-items-center">
                    <div> <b>Ratings & Reviews </b></div>
                    {reviewData && <div> <b>Number Of Reviews:</b> {reviewData.reviewCount} </div>}
                    <div> <b>Average Rating:</b> {reviewData && reviewData.averageRating.toFixed(1)} </div>
                    {reviewData && Array.from({ length: reviewData.averageRating }, (_, index) => (
                            <i key={index} className="bi bi-star-fill"></i>
                        ))}
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" >Show Reviews</button>
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
