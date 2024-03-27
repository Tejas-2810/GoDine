const express = require("express");
const reservationController = require("../controllers/userReservationController");
const router = express.Router();
const { checkAuth } = require("../middleware/authMiddleware");

router.get("/history/:userId", reservationController.getReservationHistory);

router.post(
  "/review/:userId/:reservationId",
  reservationController.postReservationReview
);

router.delete(
  "/delete/:userId/:reservationId",
  reservationController.deleteReservation
);

router.post(
  "/book",
  reservationController.createReservation
);

module.exports = router;
