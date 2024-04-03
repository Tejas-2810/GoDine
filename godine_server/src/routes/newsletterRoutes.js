// newsletterRoutes.js
const express = require("express");
const router = express.Router();
const {
  subscribeToNewsletter,
  initNewsletterSchedule,
  unSubscribeToNewsletter,
  getAllData,
} = require("../controllers/newsletterController");

// Route to handle newsletter subscription from the newsletter page
router.get("/", getAllData);
router.post("/subscribe", subscribeToNewsletter);
router.post("/unsubscribe", unSubscribeToNewsletter);

// Initialize the newsletter sending schedule when the server starts
initNewsletterSchedule();

module.exports = router;
