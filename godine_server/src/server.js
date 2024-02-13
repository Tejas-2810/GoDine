// server.js

const express = require('express');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./database/db'); 
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
async function startServer() {
    try {
        await connectToDatabase();

        // Routes
        app.use('/users', userRoutes);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
