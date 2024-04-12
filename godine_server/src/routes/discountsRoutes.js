const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountsController");

router.get("/", discountController.getAllDiscounts);
router.get("/:discountId", discountController.getDiscountById);


module.exports = router;
