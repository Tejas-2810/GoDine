const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET user profile
router.get("/:userID", userController.getUserProfile);

// PUT update user profile
router.put("/edit/:userID", userController.updateUserProfile);

// PUT update user's newsletter subscription status
router.put("/subscribe/:userID", userController.updateNewsletterSubscription);

// POST add a restaurant to wishlist
router.post("/wishlist/add/:userID", userController.addRestaurantToWishlist);

// DELETE remove a restaurant from wishlist
router.delete(
  "/wishlist/remove/:userID",
  userController.removeRestaurantFromWishlist
);

// GET get user's wishlist
router.get("/wishlist/:userID", userController.getUserWishlist);

module.exports = router;
