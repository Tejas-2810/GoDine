const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const transporter = require("../config/nodemailer");
const { v4: uuidv4 } = require("uuid");

exports.signup = async (req, res) => {
  const uniqueId = uuidv4();
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }

  try {
    const name = firstName + " " + lastName;
    const userID = uniqueId;

    const newUser = await User.create({
      userID,
      name,
      email,
      password,
      phoneNumber,
      role,
    });

    res
      .status(201)
      .json({ user: newUser, message: "Successfully created a user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
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

exports.forgotPassword = async (req, res) => {
  const server_url = "https://godine.netlify.app/" || "http://localhost:3000";
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${server_url}/reset-password/${resetToken}`;

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
  try {
    const resetToken = req.params.token;
    let user = await User.findOne({
      passwordResetExpires: { $gt: Date.now() },
    });

    // Find user by comparing hashed tokens
    if (!user || !(await bcrypt.compare(resetToken, user.passwordResetToken))) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Successfully updated the password!" });
  } catch (err) {
    res.status(500).json({ message: "Error in resetting password" });
  }
};
