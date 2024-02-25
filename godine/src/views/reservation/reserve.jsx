import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "./reserve.css";
const Reserve = () => {
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

                                </div>
                            </div>
                            
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col-md-4">
                    <form className="m-5 fcontainer">
                        <h4>Reservation Form</h4>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" className="form-control" id="nameInput" placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneInput">Phone</label>
                            <input type="text" className="form-control" id="phoneInput" placeholder="Enter phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateInput">Date</label>
                            <input type="date" className="form-control" id="dateInput" placeholder="Enter date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeInput">Time</label>
                            <input type="time" className="form-control" id="timeInput" placeholder="Enter time" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="guestsInput">Number of guests (max 5)</label>
                            <div className="dropdown">
                                <button className="form-control dropdown-toggle" type="button" id="guestsInput" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <div className="m-5">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    );
}

export default Reserve;
