import React from "react";
import './history.css';

const history = () => {

    const data = [
        {
            id: 1,
            restaurantName: "Restaurant 1",
            date: "2022-01-01",
            time: "12:00 PM",
            status: "Completed"
        },
        {
            id: 2,
            restaurantName: "Restaurant 2",
            date: "2022-01-02",
            time: "06:30 PM",
            status: "Pending"
        },
        {
            id: 3,
            restaurantName: "Restaurant 3",
            date: "2022-01-03",
            time: "08:00 PM",
            status: "Completed"
        }
    ];

    return (
        <div className="container cb bp">
            <table className="table table-hover ">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Restaurant name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Review</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className={item.status === "Completed" ? "table-success" : item.status === "Pending" ? "table-primary" : "table-danger"}>
                            <td>{item.id}</td>
                            <td>{item.restaurantName}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.status}</td>
                            <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Review</button></td>
                            <td><button type="button" className="btn btn-danger">Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Leave a Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-2"></div>
                                                        <form className="m-5 fcontainer ">
                                                            <div className="form-group">
                                                                <label htmlFor="ratingInput">Rate your experience</label>
                                                                <div className="rating mx-5">
                                                                    <input type="radio" name="rating" value="5" id="5" />
                                                                    <label htmlFor="5">☆</label>
                                                                    <input type="radio" name="rating" value="4" id="4" />
                                                                    <label htmlFor="4">☆</label>
                                                                    <input type="radio" name="rating" value="3" id="3" />
                                                                    <label htmlFor="3">☆</label>
                                                                    <input type="radio" name="rating" value="2" id="2" />
                                                                    <label htmlFor="2">☆</label>
                                                                    <input type="radio" name="rating" value="1" id="1" />
                                                                    <label htmlFor="1">☆</label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="questionInput">Would you recommand us to your friends and family ?</label>
                                                                <div className="d-flex flex-column">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="yesNo" id="yes" value="yes" />
                                                                        <label className="form-check-label" htmlFor="yes">
                                                                            Yes
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="yesNo" id="no" value="no" />
                                                                        <label className="form-check-label" htmlFor="no">
                                                                            No
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="questionInput">Comment:</label>
                                                                <textarea className="form-control rc" id="commentInput" placeholder="Enter your comment"></textarea>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            };

export default history;

