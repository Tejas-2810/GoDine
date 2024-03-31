const express = require("express");

const router = express.Router();
// assuming you have authentication middleware
const paymentController = require("../controllers/paymentController");

// Route to get all payments (admin only)
router.get("/", paymentController.getAllPayments);

// Route to create a payment (users and restaurant owners)
router.post("/", paymentController.createPayment);

router.get("/:paymentID", paymentController.getPaymentByID);

module.exports = router;
