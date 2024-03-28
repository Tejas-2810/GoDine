const Users = require("../models/users");

// Controller to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userID = req.params.userID;
    console.log(userID);
    const user = await Users.findOne({ userID: userID });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userID = req.params.userID;
    let user = await Users.findOne({ userID: userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields
    user.username = req.body.username;
    user.email = req.body.email;
    user.userID = req.body.userID;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    const restaurantID = req.body.restaurantID;

    // Check if restaurantID is provided in the request body
    if (!restaurantID) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const user = await Users.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Capture the initial length of the wishlist
    const initialLength = user.wishlist.length;

    // Safely filter the wishlist, avoiding errors on null values
    user.wishlist = user.wishlist.filter(
      (item) => item && item.toString() !== restaurantID.toString()
    );

    // Check if the wishlist length has changed after the filter operation
    if (initialLength === user.wishlist.length) {
      // If lengths are equal, the restaurant ID was not found in the wishlist
      return res
        .status(404)
        .json({ message: "Restaurant does not exist in wishlist" });
    }

    await user.save();

    res.json({ message: "Restaurant removed from wishlist" });
  } catch (err) {
    console.error(err); // Log the error for detailed debugging
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
    const user = await Users.findById(userID).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
