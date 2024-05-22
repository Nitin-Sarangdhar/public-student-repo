const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
    console.log('Trial POST Request received');
    res.json({ message: 'Trial POST success' });
});
module.exports = router;
