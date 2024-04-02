const bcrypt = require("bcryptjs"); // Import the bcryptjs module to hash passwords
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken module to create and verify tokens
const User = require("../models/users"); // Import the User model
const transporter = require("../config/nodemailer"); // Import the nodemailer transporter
const { v4: uuidv4 } = require("uuid");

//Create a new user
exports.signup = async (req, res) => {
  const uniqueId = uuidv4();
  const { firstName, lastName, email, password, role } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }

  try {
    const name = firstName + " " + lastName;
    const userID = uniqueId;
    console.log(userID, name, email, password, role);
    const newUser = await User.create({
      userID,
      name,
      email,
      password,
      role,
    });
    // Create a token for JWT_EXPIRES_IN duration (6 minutes)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Send the token and the user data in the response
    res.status(201).json({ token, data: { user: newUser } });
  } catch (err) {
    // If there is an error, send the error message in the response
    res.status(500).json({ message: err.message });
  }
};

//Check if the user exists and the password is correct
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    // If the user does not exist or the password is incorrect, send a 401 status code and a message
    //Compare the hashed version of the present password with the hashed password in the database
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = user.createPasswordResetToken();
  //Bypass the validation of the user model
  await user.save({ validateBeforeSave: false });

  //Change the resetURL to the frontend URL
  const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
  console.log("NEW");
  const message = `Reset your password: ${resetURL}.`;

  try {
    await transporter.sendMail({
      to: user.email,
      subject: "GoDine Password Reset",
      text: message,
    });

    res.json({
      status: "success",
      message: "Password reset linksent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: "Error sending email" });
  }
};

//Reset password
exports.resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  let user = await User.findOne({ passwordResetExpires: { $gt: Date.now() } });

  // Find user by comparing hashed tokens
  if (!user || !(await bcrypt.compare(resetToken, user.passwordResetToken))) {
    return res.status(400).json({ message: "Token is invalid or has expired" });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  user.save({ validateBeforeSave: false });
  // is this code needed as I am forcing the user to log in again in front end
  // Log the user in, send JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({ token });
};
