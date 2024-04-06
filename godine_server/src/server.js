require("dotenv").config(); // Import the dotenv module to access the environment variables
const express = require("express"); // Import the express module
const cors = require("cors");
const mongoose = require("mongoose"); // Import the mongoose module
const { connectToDatabase } = require("./database/db"); // Import the connectToDatabase function
const userRoutes = require("./routes/userRoutes"); // Import the userRoutes
const authRoutes = require("./routes/authRoutes"); // Import the authRoutes
const newsletterRoutes = require("./routes/newsletterRoutes"); // Import the newsletterRoutes
const restaurantRoutes = require("./routes/restaurantRoutes"); // Import the restaurantRoutes
const paymentRoutes = require("./routes/paymentRoutes");
const userReservationRoutes = require("./routes/userReservationRoutes");
const discountPromotionsRoutes = require("./routes/discountsPromotionsRoutes");
const contactFormRoutes = require("./routes/contactFormRoutes");
const cookieParser = require("cookie-parser");
const { ensureUploadsDirectoryExists } = require("./init");
const checkAuth = require("./middleware/authMiddleware");

// env variable as array in env file.
const origin = JSON.parse(process.env.WEB_APP_ORIGIN);
var corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express(); // Create a new express application
const PORT = process.env.PORT || 8080; // Set the port to the environment variable PORT or 3000

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

ensureUploadsDirectoryExists();

async function startServer() {
  try {
    await connectToDatabase(); // Connect to the database

    app.use("/users", checkAuth, userRoutes); // Create a base URL for the user routes
    app.use("/api/auth", authRoutes); // Create a base URL for the auth routes
    app.use("/api/newsletter", newsletterRoutes); // Create a base URL for the newsletter routes
    app.use("/api/restaurants", restaurantRoutes); // Create a base URL for the restaurant routes
    app.use("/api/user-reservation", checkAuth,userReservationRoutes);
    app.use("/api/payments", checkAuth,paymentRoutes);
    app.use("/api/discountsPromotions", discountPromotionsRoutes);
    app.use("/public/upload", express.static("public/upload"));
    app.use("/contact", contactFormRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
