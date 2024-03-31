// newsletterRoutes.js
const express = require("express");
const router = express.Router();
const {
  subscribeToNewsletter,
  initNewsletterSchedule,
} = require("../controllers/newsletterController");

// Route to handle newsletter subscription from the newsletter page
router.post("/subscribe", subscribeToNewsletter);

// Initialize the newsletter sending schedule when the server starts
initNewsletterSchedule();

module.exports = router;
