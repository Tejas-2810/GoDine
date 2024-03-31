// newsletterController.js
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Users = require("../models/users");
const Newsletter = require("../models/newsletter");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendNewsletterEmail = async (email, content) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Your Newsletter",
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Function to subscribe to the newsletter
const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let newsletter = await Newsletter.findOne({ userID: user._id });
    if (!newsletter) {
      newsletter = new Newsletter({
        userID: user._id,
        newsLetterStatus: "Subscribed",
      });
    } else {
      newsletter.newsLetterStatus = "Subscribed";
    }

    await newsletter.save();
    res.json({ message: "Successfully subscribed to the newsletter" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Initialize the newsletter sending schedule
const initNewsletterSchedule = () => {
  cron.schedule(
    "17 11 * * *",
    async () => {
      try {
        const newsletters = await Newsletter.find({
          newsLetterStatus: "Subscribed",
        }).populate("userID");
        for (const newsletter of newsletters) {
          const user = await Users.findById(newsletter.userID);
          if (user && user.email) {
            const content = "This is your newsletter content!";
            await sendNewsletterEmail(user.email, content);
          }
        }
        console.log("Newsletters sent successfully");
      } catch (err) {
        console.error("Error sending newsletters: " + err.message);
      }
    },
    {
      scheduled: true,
      timezone: "America/Halifax",
    }
  );
};

module.exports = { subscribeToNewsletter, initNewsletterSchedule };
