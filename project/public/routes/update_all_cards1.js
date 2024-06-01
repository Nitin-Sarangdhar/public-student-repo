const express = require('express');
const router = express.Router();

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Route handler for POST requests to /api/update_all_cards/:requestTableIndex
router.post('/:requestTableIndex', (req, res) => {
    const requestTableIndex = req.params.requestTableIndex;
    const { buttonId } = req.body;
    console.log('Update Cards Request received for table index:', requestTableIndex);
    console.log('Button ID:', buttonId);

    // Create a shuffled list of numbers from 1 to 52
    const cards = Array.from({ length: 52 }, (_, i) => i + 1);
    const shuffledCards = shuffle(cards);

    const io = req.app.locals.io;
    io.emit('update_all_cards', shuffledCards);


    // Send response
    res.json({
        table_index: parseInt(requestTableIndex), // Convert string to integer
        card_data: shuffledCards, // Shuffled list of numbers
    });
});

// Log message for update_all_cards route initialization
console.log('Update all cards route initialized');

module.exports = router;
