const Newsletter = require("../models/newsletter");
const nodemailer = require("nodemailer");
const Users = require("../models/users");
const cron = require("node-cron");
require("dotenv").config();

// Function to send newsletter emails
const sendNewsletterEmail = async (email, content) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

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

const sendNewsletters = async () => {
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
};

// Schedule to send newsletters every week (e.g., every Monday at 10 AM)
cron.schedule("0 10 * * 1", sendNewsletters, {
  scheduled: true,
  timezone: "America/Halifax", // Timezone for Halifax, Nova Scotia, Canad
});

module.exports = {
  sendNewsletters,
};
