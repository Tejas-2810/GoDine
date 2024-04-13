import React, { useEffect, useState, useRef } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { isAxiosError } from "axios";
import useAuth from "../../hooks/useAuth";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";


const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

const Dashboard = () => {
  const { getUserId } = useAuth();
  const userId = getUserId();
  // const userId = "660e2a0646c439afcb241d1e";
  const cancelRequestRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [rdata, setRdata] = useState([]);
  const [bdata, setBdata] = useState([]);
  const [pdata, setPdata] = useState([]);
  const navigate = useNavigate();
  const [ar, setAr] = useState(0);
  const [tb, setTb] = useState(0);


  useEffect(() => {
    const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
    const ear = `${server_url}/api/restaurants/overall-averagerating/${userId}`;
    const etb = `${server_url}/api/restaurants/total-bookings/${userId}`;    
    axios.get(ear).then((response) => {
      const ar = response.data.overallAverageRating;
      setAr(ar);
    });
    axios.get(etb).then((response) => {
      const tb = response.data.totalBookings;
      setTb(tb);
    });
    
    
    cancelRequestRef.current?.abort();
    cancelRequestRef.current = new AbortController();
    const fetchData = async () => {
      const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants/restaurantratings";
      const endpoint = `${server_url}/${resturant_endpoint}/${userId}`;
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios
          .get(endpoint, {
            signal: cancelRequestRef.current?.signal,
            headers: headers,
          })
          .then((response) => response)
          .catch((err) => err);
        setRdata(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchData2 = async () => {
      const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants/numberOfrestaurantbookings";
      const endpoint = `${server_url}/${resturant_endpoint}/${userId}`;
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios
          .get(endpoint, {
            signal: cancelRequestRef.current?.signal,
            headers: headers,
          })
          .then((response) => response)
          .catch((err) => err);
        setBdata(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchData3 = async () => {
      const resturant_endpoint = process.env.REACT_APP_PROFILE_ENDPOINT || "api/restaurants/bookingpercentages";
      const endpoint = `${server_url}/${resturant_endpoint}/${userId}`;
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios
          .get(endpoint, {
            signal: cancelRequestRef.current?.signal,
            headers: headers,
          })
          .then((response) => response)
          .catch((err) => err);
        setPdata(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };


    fetchData();
    fetchData2();
    fetchData3();
  }, []);
  console.log("data----"+ar, tb)

  var gone = [];
  var gtwo = [];
  var gthree = [];
  if (rdata) {
    gone = rdata.map((item) => {
      return { label: item.restaurantName, y: item.averageRating };
    });
  }
  if (bdata) {
    gtwo = bdata.map((item) => {
      return { label: item.restaurantName, y: item.numberOfBookings };
    });
  }
  if (pdata) {
    gthree = [
      { label: "Paid Booking", y: parseFloat(pdata.paidBookingPercentage) },
      { label: "Free Booking", y: parseFloat(pdata.freeBookingPercentage) },
    ];
  }

  const barOptions = {
    backgroundColor: null,
    title: {
      text: "Average Ratings",
    },
    data: [
      {
        type: "column",
        dataPoints: gone.map((item) => ({
          label: item.label,
          y: item.y,
        })),
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
        dataPoints: gthree.map((item) => ({
          label: item.label,
          y: item.y,
        })),
      },
    ],
  };

  const barOptions2 = {
    backgroundColor: null,
    title: {
      text: "Average Bookings",
    },
    data: [
      {
        type: "column",
        dataPoints: gtwo.map((item) => ({
          label: item.label,
          y: item.y,
        })),
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
            <div className="card col-md-5">
              <div className="card-body text-center">
                <h5 className="card-title">Total Bookings</h5>
                <p className="card-text">{tb}</p>
              </div>
            </div>
            <div className="card col-md-5 ">
              <div className="card-body text-center">
                <h5 className="card-title">Average Ratings</h5>
                <p className="card-text">{ar}⭐</p>
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
            <CanvasJSChart options={barOptions2} />
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
