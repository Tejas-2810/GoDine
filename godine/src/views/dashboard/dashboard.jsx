import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

const Dashboard = () => {
  const { getUserId } = useAuth();
  const userId = getUserId();
  const barOptions = {
    backgroundColor: null,
    title: {
      text: "Income Chart",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "January", y: 10 },
          { label: "February", y: 15 },
          { label: "March", y: 25 },
          { label: "April", y: 30 },
          { label: "May", y: 28 },
        ],
      },
    ],
  };
  const [data, setData] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [currentReviewDetails, setCurrentReviewDetails] = useState({
    userId: null,
    reservationId: null,
    restaurantId: null,
  });
  const handleCancel = async (userId, reservationId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const deleteUrl = `${server_url}/api/user-reservation/delete/${userId}/${reservationId}`;
        await axios.delete(deleteUrl, { headers: headers });
        setData(data.filter((item) => item._id !== reservationId));
      } catch (error) {
        console.error("Failed to delete the reservation:", error);
      }
    } else {
      console.log("Reservation cancellation aborted by the user.");
    }
  };
  const [showModal, setShowModal] = useState(false);
  const pieOptions = {
    backgroundColor: null,
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Booking Type",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 45, label: "Free Bookings" },
          { y: 55, label: "Paid Bookings" },
        ],
      },
    ],
  };

  const lineOptions = {
    backgroundColor: null,
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Number of Bookings",
    },
    axisY: {
      title: "Number of Bookings",
    },
    data: [
      {
        type: "area",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## Million",
        dataPoints: [
          { x: new Date(2017, 0), y: 7.6 },
          { x: new Date(2016, 0), y: 7.3 },
          { x: new Date(2015, 0), y: 6.4 },
          { x: new Date(2014, 0), y: 5.3 },
          { x: new Date(2013, 0), y: 4.5 },
          { x: new Date(2012, 0), y: 3.8 },
          { x: new Date(2011, 0), y: 3.2 },
        ],
      },
    ],
  };

  return (
    <div className="cb">
      <div className="row">
        <div className="col-md-6">
          <div className="row my-auto justify-content-evenly my-auto mx-3">
            <div className="card col-md-3">
              <div className="card-body text-center">
                <h5 className="card-title">Average Order Value</h5>
                <p className="card-text">$50</p>
              </div>
            </div>
            <div className="card col-md-3 mx-5">
              <div className="card-body text-center">
                <h5 className="card-title">Total Revenue</h5>
                <p className="card-text">$3000</p>
              </div>
            </div>
            <div className="card col-md-3 mx-5">
              <div className="card-body text-center">
                <h5 className="card-title">Average Ratings</h5>
                <p className="card-text">3.9⭐</p>
              </div>
            </div>
          </div>
          <div className="my-2 m-5 p-5">
            {" "}
            <CanvasJSChart options={barOptions} />
          </div>
          <div className="my-2 m-5 p-5">
            {" "}
            <CanvasJSChart options={pieOptions} />
          </div>
          <div className="my-2 m-5 p-5">
            {" "}
            <CanvasJSChart options={lineOptions} />
          </div>
        </div>
        <div className="col-md-6 p-5">
          <div className="border p-5 glass">          
            <form className="form">
            <h1 className="text-center">Add A Restaurant</h1>
            <div className="form-group">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input type="text" className="form-control" id="restaurantName" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" />
            </div>
            <div className="form-group">
              <label htmlFor="cuisines">Cuisines</label>
              <input type="text" className="form-control" id="cuisines" />
            </div>
            <div className="form-group">
              <label htmlFor="workingHours">Working Hours</label>
              <input type="text" className="form-control" id="workingHours" />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <select className="custom-select">
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                    <option value="+111">+111</option>
                    <option value="+71">+71</option>
                    <option value="+60">+60</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="seatingCapacity">Seating Capacity</label>
              <input
                type="text"
                className="form-control"
                id="seatingCapacity"
              />
            </div>
            <div className="form-group">
              <label htmlFor="menu">Upload Menu</label>
              <input type="file" className="form-control-file" id="menu" />
            </div>
            <div className="form-group">
              <label htmlFor="photos">Upload Photos</label>
              <input type="file" className="form-control-file" id="photos" />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                Add Restaurant
              </button>
            </div>
          </form>
          </div>
          <div className="my-5">
            <h1 className="text-center">Your Restaurants</h1>
          <table className="table table-hover">
        <thead>
          <tr>
            <th>S.No</th>
            <th className="">Restaurant name</th>
            <th>Delete Restaurant</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, index) => {
              const date = new Date(item.reservationDateTime);
              const formattedDate = date.toLocaleDateString("en-US");
              const formattedTime = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <tr
                  key={index}
                  className={
                    item.status === "Completed"
                      ? "table-success"
                      : item.status === "Pending"
                        ? "table-primary"
                        : "table-light-blue"
                  }
                >
                  <td>{index + 1}</td>
                  <td>
                    {
                      restaurantDetails.find(
                        (rest) => rest._id === item.restaurantID
                      )?.restaurantName
                    }
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleCancel(getUserId(), item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
