const express = require('express');
const router = express.Router();

const cors = require('cors'); // Import the CORS middleware

module.exports = function(io, app) {
    // Middleware to pass io object
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    router.use(cors());

    const trialRoute = require('./trial');
    const trialPostRoute = require('./trialpost');
    // Import the update_all_cards route
    const updateAllCardsRoute = require('./update_all_cards')(io);

    // Use the update_all_cards route
    router.use('/update_all_cards', updateAllCardsRoute);

    // Use the trial route
    router.use('/trial', trialRoute);
    router.use('/trialpost', trialPostRoute); // Include the trialpost route

    console.log('API route initialized');

    // Example API route
    router.get('/data', (req, res) => {
        console.log('Request received for /api/data');
        // Your API logic here
        res.json({ message: 'API data' });
    });

    return router; // Return the router instance
};
