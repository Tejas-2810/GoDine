const express = require("express");
const multer = require("multer");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const cloudinary = require('../config/cloudinaryConfig');

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
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

//Top 3 restaurants
router.get("/toprestaurants", restaurantController.getTopRestaurants);

//Top 5 restaurants by seating capacity
router.get(
  "/topseatingrestaurants",
  restaurantController.getTopRestaurantsBySeatingCapacity
);

// Restaurant Page
router.get("/:id", restaurantController.getRestaurantById);

// Restaurant Reviews
router.get("/:restaurantID/reviews", restaurantController.getRestaurantReviews);

//Home page
router.get("/", restaurantController.getAllRestaurantsForHomePage);

module.exports = router;
