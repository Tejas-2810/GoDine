const express = require("express"); //Import express module
const router = express.Router(); // Create a Router object
const authController = require("../controllers/authController"); //Import the authController module

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

module.exports = router; //Export the router object (Making it available to other modules)
