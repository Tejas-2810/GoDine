// import React from "react";
// import { useState, useEffect } from "react";
// import "./history.css";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios"; // Import axios

// const History = () => {
//   // const { getUserId } = useAuth();
//   // const userId = getUserId();

//   // const handleCancel = async (userId, reservationId) => {
//   //   console.log("userid", userId, "reservationid", reservationId);
//   //   const deleteUrl = `http://127.0.0.1:8080/api/user-reservation/delete/${userId}/${reservationId}`;

//   //   console.log(deleteUrl);
//   //   try {
//   //     const response = await fetch(deleteUrl, {
//   //       method: "delete",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       credentials: "include",
//   //     });

//   //     console.log(response);

//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     const newData = data.filter((item) => item._id !== reservationId);
//   //     setData(newData);
//   //   } catch (error) {
//   //     console.error("Failed to delete the reservation:", error);
//   //   }
//   // };

//   // const [data, setData] = useState([]);
//   // const [restaurantDetails, setrestaurantDetails] = useState([]);
//   // const [currentReviewDetails, setCurrentReviewDetails] = useState({
//   //   userId: null,
//   //   reservationId: null,
//   //   restaurantId: null,
//   // });
//   // const [review, setReview] = useState({
//   //   rating: "",
//   //   recommendation: "",
//   //   comment: "",
//   // });

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setReview((prevReview) => ({
//   //     ...prevReview,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleSubmit = async (e) => {
//   //   const { userId, reservationId, restaurantId } = currentReviewDetails;

//   //   console.log(userId, reservationId, restaurantId);
//   //   e.preventDefault();

//   //   setReview({
//   //     rating: "",
//   //     recommendation: "",
//   //     comment: "",
//   //   });

//   //   console.log("UUU");

//   //   const post_review = `http://localhost:8080/api/user-reservation/review/${userId}/${reservationId}`;

//   //   console.log(userId, reservationId, restaurantId);

//   //   console.log("REVIEW", post_review);

//   //   const reviewData = {
//   //     userID: userId,
//   //     reservationID: reservationId,
//   //     restaurantID: restaurantId,
//   //     rating: review["rating"],
//   //     review: review["comment"],
//   //   };
//   //   try {
//   //     const response = await fetch(post_review, {
//   //       method: "post",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       credentials: "include",
//   //       body: JSON.stringify(reviewData),
//   //     });

//   //     console.log(response);

//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to add the review ", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const userId = getUserId();
//   //     const url = `http://localhost:8080/api/user-reservation/history/${userId}`;
//   //     const get_rest_name = `http://localhost:8080/api/restaurants/`;
//   //     console.log("2ND ID", userId);

//   //     try {
//   //       const response = await fetch(url, {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         credentials: "include",
//   //       });

//   //       const response_rest = await fetch(get_rest_name, {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         credentials: "include",
//   //       });

//   //       console.log("RESERVATION HISTORY", response);
//   //       console.log("RESTAURANTS", response_rest);
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! status: ${response.status}`);
//   //       }
//   //       const jsonData = await response.json();
//   //       console.log("ERFDCVERS", jsonData, typeof jsonData);
//   //       setData(jsonData.reservations);

//   //       const jsonData1 = await response_rest.json();
//   //       setrestaurantDetails(jsonData1);
//   //     } catch (error) {
//   //       console.error("Failed to fetch data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   const { getUserId } = useAuth();
//   const userId = getUserId();

//   const [data, setData] = useState([]);
//   const [restaurantDetails, setRestaurantDetails] = useState([]);
//   const [currentReviewDetails, setCurrentReviewDetails] = useState({
//     userId: null,
//     reservationId: null,
//     restaurantId: null,
//   });
//   const [review, setReview] = useState({
//     rating: "",
//     recommendation: "",
//     comment: "",
//   });

//   const handleCancel = async (userId, reservationId) => {
//     const deleteUrl = `http://127.0.0.1:8080/api/user-reservation/delete/${userId}/${reservationId}`;

//     try {
//       await axios.delete(deleteUrl, {
//         withCredentials: true, // Add withCredentials
//       });

//       const newData = data.filter((item) => item._id !== reservationId);
//       setData(newData);
//     } catch (error) {
//       console.error("Failed to delete the reservation:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setReview((prevReview) => ({
//       ...prevReview,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { userId, reservationId, restaurantId } = currentReviewDetails;
//     const post_review = `http://localhost:8080/api/user-reservation/review/${userId}/${reservationId}`;

//     try {
//       await axios.post(
//         post_review,
//         {
//           userID: userId,
//           reservationID: reservationId,
//           restaurantID: restaurantId,
//           rating: review.rating,
//           review: review.comment,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       setReview({
//         rating: "",
//         recommendation: "",
//         comment: "",
//       });
//     } catch (error) {
//       console.error("Failed to add the review ", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = `http://localhost:8080/api/user-reservation/history/${userId}`;
//       const get_rest_name = `http://localhost:8080/api/restaurants/`;
//       const { token } = useAuth();
//       console.log(url);
//       console.log(get_rest_name);

//       try {
//         const headers = {
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//           "Content-Type": "application/json",
//         };
//         console.log("OOOOOO");
//         // const response = await axios.get(url, {
//         //   withCredentials: true,
//         // });

//         // console.log("PROBLEM", response);

//         // const response_rest = await axios.get(get_rest_name, {
//         //   withCredentials: true,
//         // });

//         const response = await axios.get(url, {
//           withCredentials: true,
//           headers,
//         });
//         const response_rest = await axios.get(get_rest_name, {
//           withCredentials: true,
//           headers,
//         });

//         setData(response.data.reservations);
//         setRestaurantDetails(response_rest.data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();
//   }, []);

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./history.css";
// import useAuth from "../../hooks/useAuth"; // Update the import path as needed

// const History = () => {
//   // Assuming useAuth hook provides userId and possibly a token for authenticated requests
//   const { getUserId, token } = useAuth();
//   const userId = getUserId();

//   const [data, setData] = useState([]);
//   const [restaurantDetails, setRestaurantDetails] = useState([]);
//   // Assuming you're managing some form states here for reviews
//   const [currentReviewDetails, setCurrentReviewDetails] = useState({
//     userId: null,
//     reservationId: null,
//     restaurantId: null,
//   });
//   const [review, setReview] = useState({
//     rating: "",
//     recommendation: "",
//     comment: "",
//   });

//   // Function to handle reservation cancellation
//   const handleCancel = async (userId, reservationId) => {
//     console.log(userId, reservationId, "PPPP[", token);

//     try {
//       const deleteUrl = `http://127.0.0.1:8080/api/user-reservation/delete/${userId}/${reservationId}`;

//       console.log("amma please amma", deleteUrl);
//       await axios.delete(deleteUrl, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` }, // If needed
//       });

//       console.log("hmmmm");
//       // Filter out the canceled reservation
//       setData(data.filter((item) => item._id !== reservationId));
//     } catch (error) {
//       console.error("Failed to delete the reservation:", error);
//     }
//   };

//   // Function to handle review submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { reservationId, restaurantId } = currentReviewDetails;
//     const reviewUrl = `http://localhost:8080/api/user-reservation/review/${userId}/${reservationId}`;

//     try {
//       await axios.post(
//         reviewUrl,
//         {
//           userID: userId,
//           reservationID: reservationId,
//           restaurantID: restaurantId,
//           rating: review.rating,
//           review: review.comment,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // Reset review form
//       setReview({ rating: "", recommendation: "", comment: "" });
//       // Optionally refresh data or provide user feedback
//     } catch (error) {
//       console.error("Failed to add the review", error);
//     }
//   };
//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;

//     // For a checkbox, use the 'checked' property to determine the state value.
//     // For other inputs (e.g., text fields, radio buttons), use the 'value' property.
//     setReview((prevReview) => ({
//       ...prevReview,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Function to fetch data for reservations and restaurants
//   const fetchData = async () => {
//     const historyUrl = `http://localhost:8080/api/user-reservation/history/${userId}`;
//     const restaurantsUrl = `http://localhost:8080/api/restaurants/`;

//     try {
//       console.log(historyUrl);
//       const response = await axios.get(historyUrl, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("SHIT", response);
//       const responseRest = await axios.get(restaurantsUrl, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setData(response.data.reservations);
//       setRestaurantDetails(responseRest.data);
//     } catch (error) {
//       if (error.response.status == 404) {
//         setData({});
//       }
//       console.error("Failed to fetch data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Fetch data on component mount
//   }, []);
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./history.css"; // Make sure the path is correct
import useAuth from "../../hooks/useAuth"; // Make sure the path is correct

const History = () => {
  const { getUserId } = useAuth();

  const userId = getUserId();

  const [data, setData] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [currentReviewDetails, setCurrentReviewDetails] = useState({
    userId: null,
    reservationId: null,
    restaurantId: null,
  });
  const [review, setReview] = useState({
    rating: "",
    recommendation: "",
    comment: "",
  });

  useEffect(() => {
    // if (!token) {
    //   console.warn("Token not available yet. Delaying data fetch.");
    //   // Early return if token isn't available, thus preventing API call
    // }
    const fetchData = async () => {
      //console.log("first", token);
      const historyUrl = `http://localhost:8080/api/user-reservation/history/${userId}`;
      const restaurantsUrl = `http://localhost:8080/api/restaurants/`;
      try {
        const [reservationsResponse, restaurantsResponse] = await Promise.all([
          axios.get(historyUrl, {
            withCredentials: true,
          }),
          axios.get(restaurantsUrl, {
            withCredentials: true,
          }),
        ]);
        setData(reservationsResponse.data.reservations);
        setRestaurantDetails(restaurantsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleCancel = async (userId, reservationId) => {
    // if (!token) {
    //   console.error("Token is not available for cancellation.");
    //   //return;
    // }
    try {
      //console.log("second", token);

      console.log(userId, reservationId);
      const deleteUrl = `http://localhost:8080/api/user-reservation/delete/${userId}/${reservationId}`;
      await axios.delete(deleteUrl, {
        withCredentials: true,
      });
      setData(data.filter((item) => item._id !== reservationId));
    } catch (error) {
      console.error("Failed to delete the reservation:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!token) {
    //   console.error("Token is not available for submitting the review.");
    //   return;
    // }
    const { reservationId, restaurantId } = currentReviewDetails;
    const reviewUrl = `http://localhost:8080/api/user-reservation/review/${userId}/${reservationId}`;

    console.log(reviewUrl);
    try {
      await axios.post(
        reviewUrl,
        {
          userID: userId,
          reservationID: reservationId,
          restaurantID: restaurantId,
          rating: review.rating,
          review: review.comment,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setReview({ rating: "", recommendation: "", comment: "" }); // Reset form after submission
    } catch (error) {
      console.error("Failed to add the review", error);
    }
  };
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
          {Array.isArray(data) &&
            data.map((item, index) => {
              console.log("PPPDW", item);
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
                        : "table-danger"
                  }
                >
                  <td>{index}</td>
                  <td>
                    {restaurantDetails.map((item1, index) => {
                      if (item.restaurantID == item1._id)
                        return item1.restaurantName;
                    })}
                  </td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>{item.status}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() =>
                        setCurrentReviewDetails({
                          userId: getUserId(),
                          reservationId: item._id,
                          restaurantId: item.restaurantID,
                        })
                      }
                    >
                      Review
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleCancel(getUserId(), item._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Leave a Review
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="m-5 fcontainer">
                <div className="form-group">
                  <label htmlFor="ratingInput">Rate your experience</label>
                  <div className="rating mx-5">
                    {["5", "4", "3", "2", "1"].map((rating) => (
                      <React.Fragment key={rating}>
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          id={`rating-${rating}`}
                          checked={review.rating === rating}
                          onChange={handleChange}
                        />
                        <label htmlFor={`rating-${rating}`}>☆</label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="questionInput">
                    Would you recommend us to your friends and family?
                  </label>
                  <div className="d-flex flex-column">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recommendation"
                        id="yes"
                        value="yes"
                        checked={review.recommendation === "yes"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recommendation"
                        id="no"
                        value="no"
                        checked={review.recommendation === "no"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="no">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="commentInput">Comment:</label>
                  <textarea
                    className="form-control rc"
                    id="commentInput"
                    name="comment"
                    placeholder="Enter your comment"
                    value={review.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
