const Reservation = require("../models/reservations");
const Review = require("../models/review");
const User = require("../models/users");
const mongoose = require("mongoose");
// Function to get all restaurants owned by a specific user
exports.getRestaurantsByOwner = async (req, res) => {
    try {
      const ownerId = req.params.userId;
      const owner = await User.findById(ownerId).populate('restaurants');
      if (!owner) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(owner.restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.getBookingPercentagesForUserRestaurants = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('restaurants');
      if (!user || user.restaurants.length === 0) {
        return res.status(404).json({ message: "User or user's restaurants not found" });
      }
  
      const restaurantIds = user.restaurants.map(restaurant => restaurant._id);
      const reservations = await Reservation.find({ 
        restaurantID: { $in: restaurantIds } 
      });
  
      const totalReservations = reservations.length;
      const paidBookings = reservations.filter(reservation => reservation.modeOfBooking === 'paid').length;
      const freeBookings = reservations.filter(reservation => reservation.modeOfBooking === 'free').length;
  
      if (totalReservations === 0) {
        return res.status(404).json({ message: "No reservations found for user's restaurants" });
      }
  
      const paidBookingPercentage = (paidBookings / totalReservations) * 100;
      const freeBookingPercentage = (freeBookings / totalReservations) * 100;
  
      res.json({
        totalReservations,
        paidBookingPercentage: paidBookingPercentage.toFixed(2) + '%',
        freeBookingPercentage: freeBookingPercentage.toFixed(2) + '%'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.getRestaurantBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('restaurants');

    if (!user || user.restaurants.length === 0) {
      return res.status(404).json({ message: "User or user's restaurants not found" });
    }

    const bookingData = await Promise.all(user.restaurants.map(async (restaurant) => {
      const bookingCount = await Reservation.countDocuments({ restaurantID: restaurant._id });
      return {
        restaurantName: restaurant.restaurantName,
        numberOfBookings: bookingCount
      };
    }));

    res.json(bookingData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserRestaurantsAverageRating = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('restaurants');
  
      if (!user || user.restaurants.length === 0) {
        return res.status(404).json({ message: "User or user's restaurants not found" });
      }
  
      const restaurantsRatings = await Promise.all(user.restaurants.map(async (restaurant) => {
        const averageRatingResult = await Review.aggregate([
          { $match: { restaurantID: new mongoose.Types.ObjectId(restaurant._id) } },
          { $group: { _id: "$restaurantID", averageRating: { $avg: "$rating" } } }
        ]);
  
        // Set default average rating to 0 if there are no ratings
        const averageRating = averageRatingResult.length > 0 && averageRatingResult[0].averageRating
                               ? averageRatingResult[0].averageRating.toFixed(2)
                               : 0;
  
        return {
          restaurantName: restaurant.restaurantName,
          averageRating: parseFloat(averageRating) // Ensuring the value is a number
        };
      }));
  
      res.json(restaurantsRatings);
    } catch (error) {
      console.error("Error fetching restaurant ratings:", error);
      res.status(500).json({ message: "Error fetching restaurant ratings" });
    }
  };


exports.getOverallAverageRatingForUserRestaurants = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('restaurants');
  
      if (!user || user.restaurants.length === 0) {
        return res.status(404).json({ message: "User or user's restaurants not found" });
      }
  
      let totalAverageRating = 0;
      const restaurants = await Promise.all(user.restaurants.map(async (restaurant) => {
        const averageRatingResult = await Review.aggregate([
          { $match: { restaurantID: new mongoose.Types.ObjectId(restaurant._id) } },
          { $group: { _id: "$restaurantID", averageRating: { $avg: "$rating" } } }
        ]);
  
        const averageRating = averageRatingResult.length > 0 && averageRatingResult[0].averageRating
                                 ? averageRatingResult[0].averageRating
                                 : 0;
  
        totalAverageRating += averageRating;
        return averageRating;
      }));
  
      const overallAverageRating = restaurants.length > 0
                                   ? (totalAverageRating / restaurants.length).toFixed(2)
                                   : 0;
  
      res.json({
        overallAverageRating: parseFloat(overallAverageRating)
      });
    } catch (error) {
      console.error("Error fetching overall average rating:", error);
      res.status(500).json({ message: "Error fetching overall average rating" });
    }
  };

  exports.getAverageBookingsForUserRestaurants = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('restaurants');

        if (!user || user.restaurants.length === 0) {
            return res.status(404).json({ message: "User or user's restaurants not found" });
        }

        const bookingCounts = await Promise.all(user.restaurants.map(async (restaurant) => {
            return Reservation.countDocuments({ restaurantID: restaurant._id });
        }));

        const totalBookings = bookingCounts.reduce((acc, count) => acc + count, 0);

        res.json({
            totalBookings: totalBookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  