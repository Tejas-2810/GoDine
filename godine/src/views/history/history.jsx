import React from "react";
import { useState, useEffect } from "react";
import "./history.css";

const History = () => {
  let user_id = "65fb4b3b2519c4ffea8d5fa0";

  const handleCancel = async (userId, reservationId) => {
    console.log("userid", userId, "reservationid", reservationId);
    const deleteUrl = `http://127.0.0.1:3000/api/user-reservation/delete/${userId}/${reservationId}`;

    console.log(deleteUrl);
    try {
      const response = await fetch(deleteUrl, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newData = data.filter((item) => item._id !== reservationId);
      setData(newData);
    } catch (error) {
      console.error("Failed to delete the reservation:", error);
    }
  };

  const [data, setData] = useState([]);
  const [restaurantDetails, setrestaurantDetails] = useState([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const { userId, reservationId, restaurantId } = currentReviewDetails;

    console.log(userId, reservationId, restaurantId);
    e.preventDefault();

    setReview({
      rating: "",
      recommendation: "",
      comment: "",
    });

    const post_review = `http://127.0.0.1:3000/api/user-reservation/review/${userId}/${reservationId}`;

    console.log(userId, reservationId, restaurantId);

    const reviewData = {
      userID: userId,
      reservationID: reservationId,
      restaurantID: restaurantId,
      rating: review["rating"],
      review: review["comment"],
    };
    try {
      const response = await fetch(post_review, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to add the review ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://127.0.0.1:3000/api/user-reservation/history/${user_id}`;
      const get_rest_name = `http://127.0.0.1:3000/api/restaurants/`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response_rest = await fetch(get_rest_name, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("ERFDCVERS", jsonData, typeof jsonData);
        setData(jsonData.reservations);

        const jsonData1 = await response_rest.json();
        setrestaurantDetails(jsonData1);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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
                          userId: user_id,
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
                      onClick={() => handleCancel(user_id, item._id)}
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
