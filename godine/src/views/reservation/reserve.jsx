import React,{useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "./reserve.css";
import axios from "axios"; 
const Reserve = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://www.localhost:/wp-content/api/user-reservation/book", formData);
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
                        </Card.Body>
                        <Card.Footer className="cfooter">
                            <div className="d-flex ">
                                <h3 className="col-10">In the Sky Lounge - Bar Exchange</h3>
                                <div className="col-2 text-center">
                                    <button disabled className="btn btn-success"> 4.5 </button>
                                    <p>56 <i>reviews</i></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <p>Address: 1st Floor, 763, 100 Feet Road, Indiranagar, Bangalore</p>
                                    <p>Phone: 080 49653466</p>
                                    <p>Timings: 12:00 PM - 1:00 AM</p>
                                </div>
                                <div className="col-4 text-center m-auto">
                                    <button className="btn btn-primary">Menu</button>
                                    <button className="btn btn-primary">Review</button>
                                    <button className="btn btn-primary">Overview</button>
                                </div>
                            </div>
                            
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className="m-5 fcontainer">
                        <h4>Reservation Form</h4>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" className="form-control" id="nameInput" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" className="form-control" id="emailInput" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneInput">Phone</label>
                            <input type="text" className="form-control" id="phoneInput" value={formData.phone} onChange={handleChange} placeholder="Enter phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateInput">Date</label>
                            <input type="date" className="form-control" id="dateInput" value={formData.date} onChange={handleChange} placeholder="Enter date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeInput">Time</label>
                            <input type="time" className="form-control" id="timeInput" value={formData.time} onChange={handleChange} placeholder="Enter time" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="guestsInput">Number of guests (max 5)</label>
                            <div className="dropdown">
                                <button className="form-control dropdown-toggle" type="button" id="guestsInput" value={formData.guests} onChange={handleChange} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    0
                                </button>
                                <div className="dropdown-menu" aria-labelledby="guestsInput">
                                    <a className="dropdown-item" href="#">1</a>
                                    <a className="dropdown-item" href="#">2</a>
                                    <a className="dropdown-item" href="#">3</a>
                                    <a className="dropdown-item" href="#">4</a>
                                    <a className="dropdown-item" href="#">5</a>
                                </div>
                            </div>
                        </div>
                        <div className="m-5 text-right">
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div className="col-md-2"></div>
                <form className="m-5 fcontainer ">
                    <h4>Review Form</h4>
                    <div className="form-group">
                        <label htmlFor="ratingInput">Rate your experience</label>
                        <div class="rating mx-5"> <input type="radio" name="rating" value="5" id="5"/>
                        <label for="5">☆</label> <input type="radio" name="rating" value="4" id="4"/>
                        <label for="4">☆</label> <input type="radio" name="rating" value="3" id="3"/>
                        <label for="3">☆</label> <input type="radio" name="rating" value="2" id="2"/>
                        <label for="2">☆</label> <input type="radio" name="rating" value="1" id="1"/>
                        <label for="1">☆</label>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control rc" id="commentInput" placeholder="Enter your comment"></textarea>
                    </div>

                    </div>
                    <div className="m-3 d-flex justify-content-end ">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Reserve;
