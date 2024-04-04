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

const getAllData = async (req, res) => {
  try {
    const newsletters = await Newsletter.find();
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unSubscribeToNewsletter = async (req, res) => {
  try {
    const { userID } = req.body;
    console.log(userID);

    let newsletter = await Newsletter.findOneAndDelete({ userID: userID });
    res.status(200).json({ message: "Unsubscribed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const subscribeToNewsletter = async (req, res) => {
  try {
    const { userID } = req.body;

    let newsletter = await Newsletter.findOne({ userID: userID });
    if (!newsletter) {
      newsletter = new Newsletter({
        userID: userID,
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

const initNewsletterSchedule = () => {
  cron.schedule(
    "30 10 * * 1",
    async () => {
      try {
        const newsletters = await Newsletter.find({
          newsLetterStatus: "Subscribed",
        }).populate("userID");
        for (const newsletter of newsletters) {
          const user = await Users.findById(newsletter.userID);
          if (user && user.email) {
            const content =
              "Hello " +
              user.name +
              ",\n\nThis week's newsletter: \n\n When an fancy concept restaurant opens in Vancouver, it's needs to do something special in order to stand out and distinguish itself from the plethora of fine dining options. Thankfully, that's exactly what Collective Hospitality has executed with the opening of their third restaurant. In this review, I am biased. I have already spent time in The Mackenzie Room and Say Mercy! Both had their unique twists, and French-ish is the parallel twist at Collective Good Bistro. You can deliberate between a tasting menu or order a la carte, which I love about dining in this family of restaurants, and tonight's meal was another satisfying victory for the local Vancouver scene. Collective Goods in Vancouver – Gnocchi Parisienne Food: Team Tastic came for an early Sunday dinner and I had a great taste of the following: Salmon Meunière ($20) Gnocchi Parisienne ($41) Duck ($46) The salmon meunière was a succulent and tender starter. The king salmon had a ton of fattiness, and when mixed in with fried caper berries, lemon caper vinaigrette, and candied black pepper lemon, was a playful appetizer that left me with a tart finish and a feeling of great anticipation for the rest of the meal.\n\n";
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

module.exports = {
  subscribeToNewsletter,
  initNewsletterSchedule,
  unSubscribeToNewsletter,
  getAllData,
};
