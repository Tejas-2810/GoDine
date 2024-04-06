const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountsController");
const {
  checkAuth,
  isRestaurantOwner,
  isUser,
} = require("../middleware/authMiddleware");

router.get("/", discountController.getAllDiscounts);
router.get("/:discountId", discountController.getDiscountById);


module.exports = router;
