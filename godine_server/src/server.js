require('dotenv').config(); // Import the dotenv module to access the environment variables
const express = require('express'); // Import the express module
const mongoose = require('mongoose'); // Import the mongoose module
const { connectToDatabase } = require('./database/db'); // Import the connectToDatabase function
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes
const authRoutes = require('./routes/authRoutes'); // Import the authRoutes

const app = express(); // Create a new express application
const PORT = process.env.PORT || 3000; // Set the port to the environment variable PORT or 3000

app.use(express.json());

async function startServer() {
    try {
        await connectToDatabase(); // Connect to the database
        
        app.use('/users', userRoutes); // Create a base URL for the user routes
        app.use('/api/auth', authRoutes); // Create a base URL for the auth routes

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
