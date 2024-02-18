const bcrypt = require('bcryptjs'); // Import the bcryptjs module to hash passwords
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module to create and verify tokens
const User = require('../models/users'); // Import the User model
const transporter = require('../config/nodemailer'); // Import the nodemailer transporter
const crypto = require('crypto'); // Import the crypto module to create a hash of the reset token


exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = user.createPasswordResetToken();
    //Bypass the validation of the user model
    await user.save({ validateBeforeSave: false });

    //Change the resetURL to the frontend URL
    const resetURL = `http://localhost:3000/profile${resetToken}`;
    const message = `Reset your password: ${resetURL}.`;

    try {
        await transporter.sendMail({
            to: user.email,
            subject: 'GoDine Password Reset',
            text: message,
        });

        res.json({ status: 'success', message: 'Password reset linksent to email!' });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500).json({ message: 'Error sending email' });
    }
};

exports.resetPassword = async (req, res) => {
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Log the user in, send JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({ token });
};