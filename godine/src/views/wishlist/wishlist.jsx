import React, { useEffect, useRef, useState } from "react";
import RestaurantsList from "../../components/wishlist/RestaurantsList";
import "../../components/wishlist/RestaurantCard.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const WishList = () => {
  const { getUserId } = useAuth();
  const userId = getUserId();
  console.log(userId);
  const cancelRequestRef = useRef(null);
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    const fetchWishlistAndDetails = async () => {
      const endpoint = `http://localhost:8080/users/wishlist/${userId}`;

      try {
        cancelRequestRef.current?.cancel(
          "Operation canceled due to new request."
        );
        cancelRequestRef.current = axios.CancelToken.source();

        const response = await axios.get(endpoint, {
          cancelToken: cancelRequestRef.current.token,
          withCredentials: true,
        });

        console.log(response.data); // Log the data to verify

        // Fetch ratings for each restaurant ID in the response
        const ratingsPromises = response.data.map((restaurantId) =>
          axios.get(
            `http://127.0.0.1:8080/api/restaurants/${restaurantId}/reviews`,
            {
              cancelToken: cancelRequestRef.current.token,
            }
          )
        );

        // Fetch additional details for each restaurant in the wishlist
        const detailsPromises = response.data.map((restaurantId) =>
          axios.get(`http://127.0.0.1:8080/api/restaurants/${restaurantId}`, {
            cancelToken: cancelRequestRef.current.token,
          })
        );

        // Wait for all promises to complete
        const [ratingsResponses, detailsResponses] = await Promise.all([
          Promise.all(ratingsPromises),
          Promise.all(detailsPromises),
        ]);

        // Construct data with details and ratings
        const wishlistDataWithDetailsAndRatings = response.data.map(
          (restaurantId, index) => {
            const details = detailsResponses[index].data;
            console.log(details);
            const ratings = ratingsResponses[index].data;
            const photoUrls = details.photos || [];
            const randomPhotoIndex = Math.floor(
              Math.random() * photoUrls.length
            );
            const averageRating = ratings.averageRating;
            const location = details.address
              ? details.address.split(",")[1].trim()
              : "Unknown";

            return {
              id: restaurantId,
              imageUrl:
                photoUrls[randomPhotoIndex] ||
                "https://via.placeholder.com/150",
              name: details.restaurantName,
              rating: Number.isFinite(averageRating)
                ? Math.round(averageRating)
                : 0,
              tags: [details.cuisine],
              location,
            };
          }
        );

        setRestaurantsData(wishlistDataWithDetailsAndRatings);
      } catch (error) {
        if (axios.isAxiosError(error) && !axios.isCancel(error)) {
          console.error("Error fetching wishlist data:", error);
        }
      }
    };

    fetchWishlistAndDetails();

    return () => {
      cancelRequestRef.current?.cancel(
        "Component unmounted, operation canceled"
      );
    };
  }, [userId]);
  // const removeRestaurantFromWishlist = async (restaurantId) => {
  //   const url = `http://localhost:8080/users/wishlist/remove/${userId}?restaurantID=${restaurantId}`;
  //   try {
  //     await axios.delete(url, { withCredentials: true });
  //     // Filter out the removed restaurant and update state
  //     setRestaurantsData(
  //       restaurantsData.filter((item) => item.id !== restaurantId)
  //     );
  //   } catch (error) {
  //     console.error("Error removing restaurant from wishlist:", error);
  //   }
  // };
  const removeRestaurantFromWishlist = async (restaurantId) => {
    // Construct the URL for removing a restaurant from the wishlist
    console.log("rest id", restaurantId);
    const url = `http://localhost:8080/users/wishlist/remove/${userId}?restaurantID=${restaurantId}`;

    try {
      // Send a DELETE request to the backend
      const response = await axios.delete(url, { withCredentials: true });

      // Log the response from the server for debugging
      console.log("Response from removing restaurant:", response.data);

      // Filter out the removed restaurant from the state
      // This updates the UI to no longer show the removed restaurant
      setRestaurantsData(
        restaurantsData.filter((item) => item.id !== restaurantId)
      );

      // Optionally, you can check the response before updating the UI
      // to ensure the backend successfully processed the request
    } catch (error) {
      // Log any error that occurs during the API call
      console.error("Error removing restaurant from wishlist:", error);
      // Optionally, handle the error in the UI, such as showing a message to the user
    }
  };
  return (
    <div className="pcontainer">
      <h1 className="wishlist-header">Wishlist Restaurants</h1>
      <RestaurantsList
        restaurants={restaurantsData}
        onRemove={removeRestaurantFromWishlist}
      />
    </div>
  );
};

export default WishList;
