import React from 'react';
import './results.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useSearchParams } from 'react-router-dom';

const Results = () => {
    const [searchParams] = useSearchParams();
    console.log("testing",searchParams.get('c')); // Output: Any Cuisine




    
    return (
        <div className='container cb'>
            <section>
                <div className="row">
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="discountDropdown"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                            Discounts
                            </button>
                            <div className="dropdown-menu" aria-labelledby="discountDropdown">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="discount-10"
                                        value="10"
                                    />
                                    <label htmlFor="discount-10">10%</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="discount-20"
                                        value="20"
                                    />
                                    <label htmlFor="discount-20">20%</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="discount-30"
                                        value="30"
                                    />
                                    <label htmlFor="discount-30">30%</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="locationDropdown"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Location
                            </button>
                            <div className="dropdown-menu" aria-labelledby="locationDropdown">
                                <a className="dropdown-item">New York</a>
                                <a className="dropdown-item">London</a>
                                <a className="dropdown-item">Halifax</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="cuisineDropdown"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Cuisine
                            </button>
                            <div className="dropdown-menu" aria-labelledby="cuisineDropdown">
                                <a className="dropdown-item">Italian</a>
                                <a className="dropdown-item">Mexican</a>
                                <a className="dropdown-item">Chinese</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="ratingsDropdown"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Ratings
                            </button>
                            <div className="dropdown-menu" aria-labelledby="ratingsDropdown">
                                <a className="dropdown-item">1</a>
                                <a className="dropdown-item">2</a>
                                <a className="dropdown-item">3</a>
                                <a className="dropdown-item">4</a>
                                <a className="dropdown-item">5</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className=" container row">
                    <div className="col-sm-4">
                        <div className="card mb-3">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Restaurant" />
                            <div className="card-body">
                                <h5 className="card-title">Restaurant Name</h5>
                                <p className="m-0">Restaurant Description</p>
                                <p className="m-0">Discount: 10%</p>
                                <p className="m-0">Location: New York</p>
                                <p className="m-0">Cuisine: Italian</p>
                                <p className="m-0">Ratings: 4.5</p>
                                <button className="btn btn-primary">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" >
                        <div className="card mb-3">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Restaurant" />
                            <div className="card-body">
                                <h5 className="card-title">Restaurant Name</h5>
                                <p className="m-0">Restaurant Description</p>
                                <p className="m-0">Discount: 10%</p>
                                <p className="m-0">Location: New York</p>
                                <p className="m-0">Cuisine: Italian</p>
                                <p className="m-0">Ratings: 4.5</p>
                                <button className="btn btn-primary">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 cds">
                        <div className="card mb-3">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Restaurant" />
                            <div className="card-body">
                                <h5 className="card-title">Restaurant Name</h5>
                                <p className="m-0">Restaurant Description</p>
                                <p className="m-0">Discount: 10%</p>
                                <p className="m-0">Location: New York</p>
                                <p className="m-0">Cuisine: Italian</p>
                                <p className="m-0">Ratings: 4.5</p>
                                <button className="btn btn-primary">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 cds">
                        <div className="card mb-3">
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Restaurant" />
                            <div className="card-body">
                                <h5 className="card-title">Restaurant Name</h5>
                                <p className="m-0">Restaurant Description</p>
                                <p className="m-0">Discount: 10%</p>
                                <p className="m-0">Location: New York</p>
                                <p className="m-0">Cuisine: Italian</p>
                                <p className="m-0">Ratings: 4.5</p>
                                <button className="btn btn-primary">Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Results;
