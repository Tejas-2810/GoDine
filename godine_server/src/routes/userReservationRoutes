const express = require("express");
const reservationController = require("../controllers/userReservationController");
const router = express.Router();


router.get("/history/:userId", reservationController.getReservationHistory);

router.post("/review/:userId/:reservationId", reservationController.postReservationReview);

router.delete(
  "/delete/:userId/:reservationId",
  reservationController.deleteReservation
);

module.exports = router;