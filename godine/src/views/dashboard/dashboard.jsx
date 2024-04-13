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
  const cancelRequestRef = useRef(null);
  const [rdata, setRdata] = useState([]);
  const [bdata, setBdata] = useState([]);
  const [pdata, setPdata] = useState([]);
  const navigate = useNavigate();
  const [ar, setAr] = useState(0);
  const [tb, setTb] = useState(0);
  const [restaurantDetails, setRestaurantDetails] = useState([]);

  // fields for creating a new restaurant
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [pricing, setPricing] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [menu, setMenu] = useState(null);
  const [photos, setPhotos] = useState(null);

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
    }, []);

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

    const fetchRestaurants = async () => {
      const endpoint = `${server_url}/api/restaurants/ownerrestaurants/${userId}`;
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(endpoint, { headers: headers });
        if (isAxiosError(response)) {
          console.error("Error fetching user's restaurants:", response.message);
          return;
        }
        setRestaurantDetails(response.data);
      } catch (error) {
        console.error("Error fetching user's restaurants:", error.message);
      }
    }

    fetchData();
    fetchData2();
    fetchData3();
    fetchRestaurants();
  }, []);

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

  // to upload file
  const handleFile = (type, e) => {
    const file = e.target.files[0];
    if (type === "menu") {
      setMenu(file);
    } else {
      setPhotos(file);
    }
  }

  // adding a restaurant
  const handAddRestaurant = async (e) => {
    e.preventDefault();
    if (!restaurantName || restaurantName === ""
      || !address || address === ""
      || !pricing || pricing === ""
      || !cuisines || cuisines === ""
      || !workingHours || workingHours === ""
      || !contactNumber || contactNumber === ""
      || !seatingCapacity || seatingCapacity === "") {

      alert("Please fill all the fields");
      return;
    }

    const phoneNumberRegex = /^\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!phoneNumberRegex.test(contactNumber) || contactNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }

    if (Number(seatingCapacity) <= 0) {
      alert("Please enter a valid seating capacity");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      };

      const form = new FormData();
      const data = {
        restaurantName: restaurantName,
        restaurantAddress: address,
        pricing: pricing,
        cuisine: cuisines,
        operatingHours: workingHours,
        contactNumber: contactNumber,
        seatingCapacity: seatingCapacity
      };

      form.append('menu', menu);
      form.append('photos', photos);
      form.append('data', JSON.stringify(data));
      form.append('userId', userId);

      const addRestaurantUrl = `${server_url}/api/restaurants/createRestaurants`;
      const response = await axios.post(addRestaurantUrl, form, { headers: headers })
        .then((response) => response)
        .catch((err) => err);

      if (isAxiosError(response)) {
        alert("Error adding restaurant");
        console.error("Error adding restaurant:", response.message);
        return;
      }

      console.log("response: ", response.data);
      
    } catch (err) {
      console.log("error in adding restaurant: ", err);
    }

  }

  const handleDeleteRestaurant = async (userId, restaurantId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }

        // delete restaurant in collection
        const deleteRestaurantUrl = `${server_url}/api/restaurants/delete/${restaurantId}`;
        await axios.delete(deleteRestaurantUrl, { headers: headers });

        // delete restaurant in owner object
        const deleteUrl = `${server_url}/api/restaurants/delete/${userId}/${restaurantId}`;
        await axios.delete(deleteUrl, { headers: headers });

        setRestaurantDetails(restaurantDetails.filter((restaurant) => restaurant._id !== restaurantId));
      } catch (error) {
        console.error("Failed to delete the restaurant:", error.message);
      }
    } else {
      console.log("Restaurant deletion aborted by the user.");
    }
  };

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
                <input type="text" value={restaurantName} className="form-control" id="restaurantName" onInput={(e) => setRestaurantName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" value={address} className="form-control" id="address" onInput={(e) => setAddress(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="pricing">Pricing</label>
                <input type="text" placeholder="Pricing for two" value={pricing} className="form-control" id="pricing" onInput={(e) => setPricing(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="cuisines">Cuisines</label>
                <input type="text" value={cuisines} onInput={(e) => setCuisines(e.target.value)} className="form-control" id="cuisines" />
              </div>
              <div className="form-group">
                <label htmlFor="workingHours">Working Hours</label>
                <input type="text" placeholder="Opening to closing time" onInput={(e) => setWorkingHours(e.target.value)} value={workingHours} className="form-control" id="workingHours" />
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
                    value={contactNumber}
                    onInput={(e) => setContactNumber(e.target.value)}
                    id="contactNumber"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="seatingCapacity">Seating Capacity</label>
                <input
                  type="text"
                  className="form-control"
                  value={seatingCapacity}
                  onInput={(e) => setSeatingCapacity(e.target.value)}
                  id="seatingCapacity" />
              </div>
              <div className="form-group">
                <label htmlFor="menu">Upload Menu</label>
                <input type="file" onChange={(e) => handleFile("menu", e)} className="form-control-file" id="menu" />
              </div>
              <div className="form-group">
                <label htmlFor="photos">Upload Photos</label>
                <input type="file" onChange={(e) => handleFile("photos", e)} className="form-control-file" id="photos" />
              </div>
              <div className="form-group text-center">
                <button onClick={(e) => handAddRestaurant(e)} className="btn btn-primary">
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
                {Array.isArray(restaurantDetails) &&
                  restaurantDetails.map((restaurant, index) => (
                    <tr
                      key={index}
                    >
                      <td>{index + 1}</td>
                      <td>
                        {
                          restaurant.restaurantName
                        }
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteRestaurant(userId, restaurant._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
