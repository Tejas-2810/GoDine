const express = require("express");
const multer = require("multer");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const restaurantDashboardController = require("../controllers/restaurantDashboardController");
const cloudinary = require('../config/cloudinaryConfig');

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(".").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

// Restaurant Dashboard
router.post(
  "/createRestaurants",
  upload.fields([
    { name: "menu", maxCount: 3 },
    { name: "photos", maxCount: 5 },
  ]),
  restaurantController.createRestaurant
);

// Get paid and free bookings percentage for user's restaurants - pie chart
router.get(
  "/bookingpercentages/:userId",
  restaurantDashboardController.getBookingPercentagesForUserRestaurants
);

// Route to get all restaurants owned by a specific user
router.get(
  '/ownerrestaurants/:userId',
  restaurantDashboardController.getRestaurantsByOwner
);

// Route to get booking data for each of a user's restaurants - line chart 
router.get(
  '/numberOfrestaurantbookings/:userId',
  restaurantDashboardController.getRestaurantBookings
);

// Route to get overall review of all user restaurants
router.get(
  '/overall-averagerating/:userId',
  restaurantDashboardController.getOverallAverageRatingForUserRestaurants
);

// Route to get average ratings for each of a user's restaurants - bar chart 
router.get(
  '/restaurantratings/:userId',
  restaurantDashboardController.getUserRestaurantsAverageRating
);

router.get(
  '/total-bookings/:userId',
  restaurantDashboardController.getAverageBookingsForUserRestaurants
);

//Top 3 restaurants
router.get("/toprestaurants", restaurantController.getTopRestaurants);

//Top 5 restaurants by seating capacity
router.get(
  "/topseatingrestaurants",
  restaurantController.getTopRestaurantsBySeatingCapacity
);

//delete restaurant by id
router.delete("/delete/:userId", restaurantController.deleteRestaurantById);

//delete restaurant from user data
router.delete("/delete/:userId/:restaurantId", restaurantDashboardController.deleteRestaurantFromUser);

// Restaurant Page
router.get("/:id", restaurantController.getRestaurantById);

// Restaurant Reviews
router.get("/:restaurantID/reviews", restaurantController.getRestaurantReviews);

//Home page
router.get("/", restaurantController.getAllRestaurantsForHomePage);

module.exports = router;
