const express = require("express");
const router = express.Router();
const contactFormController = require("../controllers/contactFormController");
const { checkAuth } = require("../middleware/authMiddleware");

// Route for submitting contact inquiries
router.post(
  "/inquiries",
  contactFormController.createContactInquiry
);

module.exports = router;
