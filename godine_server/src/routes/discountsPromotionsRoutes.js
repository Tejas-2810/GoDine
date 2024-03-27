const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountsPromotionsController");
//const promotionsController = require("../controllers/promotionsController");
const {
  checkAuth,
  isRestaurantOwner,
  isUser,
} = require("../middleware/authMiddleware");

router.get("/discounts", discountController.getAllDiscounts);
router.get("/discounts/:discountId", discountController.getDiscountById);

//router.get("/promotions", promotionsController.getAllPromotions);
//router.get("/promotions/:promotionId", promotionsController.getPromotionById);

module.exports = router;
