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
    try {
        // Extract request parameters
        const requestTableIndex = req.params.requestTableIndex;
        const { buttonId } = req.body;
        
        // Log the received request
        console.log('Update Cards Request received for table index:', requestTableIndex);
        console.log('Button ID:', buttonId);

        // Create a shuffled list of numbers from 1 to 52
        const cards = Array.from({ length: 52 }, (_, i) => i + 1);
        const shuffledCards = shuffle(cards);
        for (let i = 0; i < 8; i++) {
            shuffledCards.push(0);
        }
        
        // Send response
        res.json({
            table_index: parseInt(requestTableIndex), // Convert string to integer
            card_data: shuffledCards, // Shuffled list of numbers
        });
               // Set a timer for 5 seconds
 
        setTimeout(() => {
            // Emit the 'update_all_cards' event with shuffled cards data
            const io = req.app.locals.io;
   //         io.emit('update_all_cards', shuffledCards);
        }, 5000); // 5000 milliseconds = 5 seconds        io.emit('update_all_cards', shuffledCards);
    } catch (error) {
        // Handle errors
        console.error('Error processing update_all_cards request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Log message for update_all_cards route initialization
console.log('Update all cards route initialized');

module.exports = router;
