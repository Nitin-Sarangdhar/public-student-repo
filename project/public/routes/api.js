// routes/api.js
const express = require('express');
const router = express.Router();
const trialRoute = require('./trial');
const trialPostRoute = require('./trialpost');
// Import the update_all_cards route
const updateAllCardsRoute = require('./update_all_cards');

// Use the update_all_cards route
router.use('/update_all_cards', updateAllCardsRoute);

// Use the trial route
router.use('/trial', trialRoute);
router.use('/trialpost', trialPostRoute); // Include the trialpost route

module.exports = router;
console.log('API route initialized');

// Example API route
router.get('/data', (req, res) => {
  console.log('Request received for /api/data');
  // Your API logic here
  res.json({ message: 'API data' });
});
