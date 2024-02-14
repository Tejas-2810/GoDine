
const Users  = require('../models/users');

// Controller to get user profile
exports.getUserProfile = async (req, res) => {
  try {


    const userID = req.params.userID;
    console.log(userID);
    const user = await Users.findOne({ userID : userID });
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
