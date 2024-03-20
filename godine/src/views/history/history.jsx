import React from "react";
import './history.css';

const history = () => {
    // Data variable containing the dynamic data
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
                            <td><button>Review</button></td>
                            <td><button>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default history;