const Users = require("../models/users");
const Newsletter = require("../models/newsletter");
const mongoose = require("mongoose");

// Controller to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userID = req.params.userID;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await Users.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, phoneNumber, dateOfBirth, address } = user;
    res.status(200).json({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      address: address,
    });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
};

// Controller to update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userID = req.params.userID;

    const updatedUser = {};
    // Update the fields
    updatedUser.name = req.body.name;
    updatedUser.email = req.body.email;
    updatedUser.phoneNumber = req.body.phoneNumber;
    updatedUser.dateOfBirth = req.body.dateOfBirth;
    updatedUser.address = req.body.address;

    // Save the updated user
    const response = await Users.findByIdAndUpdate(userID, updatedUser, {
      new: true,
    });
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, phoneNumber, dateOfBirth, address } = response;
    res.status(200).json({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      address: address,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to update user's newsletter subscription status
exports.updateNewsletterSubscription = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await Users.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscriptionStatus = req.body.newsLetterStatus;
    let newsletter = await Newsletter.findById(userID);

    if (!newsletter) {
      newsletter = new Newsletter({
        userID: userID,
        newsLetterStatus: subscriptionStatus,
      });
    } else {
      newsletter.newsLetterStatus = subscriptionStatus;
    }

    await newsletter.save();
    res.json({ message: "Newsletter subscription status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addRestaurantToWishlist = async (req, res) => {
  try {
    const userID = req.params.userID;
    const restaurantID = req.body.restaurantID;
    const user = await Users.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add restaurant to wishlist if not already present
    if (!user.wishlist.includes(restaurantID)) {
      user.wishlist.push(restaurantID);
      await user.save();
      return res.json({ message: "Restaurant added to wishlist" });
    } else {
      return res
        .status(400)
        .json({ message: "Restaurant already in wishlist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.removeRestaurantFromWishlist = async (req, res) => {
  try {
    const userID = req.params.userID;
    //const restaurantID = req.body.restaurantID;
    const restaurantID = req.query.restaurantID;

    // Check if restaurantID is provided in the request body
    if (!restaurantID) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const user = await Users.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const initialLength = user.wishlist.length;

    user.wishlist = user.wishlist.filter(
      (item) => item && item.toString() !== restaurantID.toString()
    );

    if (initialLength === user.wishlist.length) {
      return res
        .status(404)
        .json({ message: "Restaurant does not exist in wishlist" });
    }

    await user.save();

    res.json({ message: "Restaurant removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while removing the restaurant from the wishlist.",
    });
  }
};

exports.getUserWishlist = async (req, res) => {
  try {
    console.log("Inside");
    const userID = req.params.userID;
    console.log(userID);
    const user = await Users.findById(userID);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
