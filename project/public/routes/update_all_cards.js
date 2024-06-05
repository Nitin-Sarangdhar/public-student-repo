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

function nextPossibleCards(playedCardArray) {
    
        
    let nextPossibleCard = Array(8).fill(0); // Initialize an array of size 8 with zeros
    console.log ('Entered nextPossibleCards playedCardArray =', playedCardArray, 'nextPossibleCards =', nextPossibleCard);

    if (playedCardArray[2] === 0) {
        nextPossibleCard[2] = 20;
    } else {
        if (playedCardArray[2] !== 14) {
            nextPossibleCard[2] = playedCardArray[2] - 1;
        } else {
            nextPossibleCard[2] = 66;
        }

        if (playedCardArray[3] === 0) {
            nextPossibleCard[3] = 21;
        } else if (playedCardArray[3] !== 26) {
            nextPossibleCard[3] = playedCardArray[3] + 1;
        } else {
            nextPossibleCard[3] = 78;
        }

        if (playedCardArray[0] === 0) {
            nextPossibleCard[0] = 7;
        } else {
            if (playedCardArray[0] !== 1) {
                nextPossibleCard[0] = playedCardArray[0] - 1;
            } else {
                nextPossibleCard[0] = 53;
            }

            if (playedCardArray[1] === 0) {
                nextPossibleCard[1] = 8;
            } else if (playedCardArray[1] !== 13) {
                nextPossibleCard[1] = playedCardArray[1] + 1;
            } else {
                nextPossibleCard[1] = 65;
            }
        }

        if (playedCardArray[4] === 0) {
            nextPossibleCard[4] = 33;
        } else {
            if (playedCardArray[4] !== 27) {
                nextPossibleCard[4] = playedCardArray[4] - 1;
            } else {
                nextPossibleCard[4] = 79;
            }

            if (playedCardArray[5] === 0) {
                nextPossibleCard[5] = 34;
            } else if (playedCardArray[5] !== 39) {
                nextPossibleCard[5] = playedCardArray[5] + 1;
            } else {
                nextPossibleCard[5] = 91;
            }
        }

        if (playedCardArray[6] === 0) {
            nextPossibleCard[6] = 46;
        } else {
            if (playedCardArray[6] !== 40) {
                nextPossibleCard[6] = playedCardArray[6] - 1;
            } else {
                nextPossibleCard[6] = 92;
            }

            if (playedCardArray[7] === 0) {
                nextPossibleCard[7] = 47;
            } else if (playedCardArray[7] !== 52) {
                nextPossibleCard[7] = playedCardArray[7] + 1;
            } else {
                nextPossibleCard[7] = 104;
            }
        }
    }
    console.log ('Exited nextPossibleCards playedCardArray =', playedCardArray, 'nextPossibleCards =', nextPossibleCard);

    return nextPossibleCard;
}

/**
 * Function to determine the first matching card as an 8-bit array and return matching indices
 * @param {Array} playerCards - Array of player's cards (first 13 cards)
 * @param {Array} nextPossibleCard - Array of next possible cards (first 8 cards)
 * @return {Object} result - Object containing nextPlayableCard array and the first matching indices
*/
function getNextPlayableCard(shuffleCards) {
    console.log ('Entered getNextPlayableCard shuffleCards[60] =', shuffleCards[60]);
    let nextPlayableCard = Array(8).fill(0); // Initialize an array of size 8 with zeros
    let matchingIndices = null; // Object to store the first matching indices
    const possibleNextCards = nextPossibleCards(shuffleCards.slice(52, 60)); // Get the next possible cards

    // Determine which player cards to use based on the value of shuffleCards[60]
    const nextPlayerCards = shuffleCards[60] === 0 ? shuffleCards.slice(0, 13) :
                            shuffleCards[60] === 1 ? shuffleCards.slice(13, 26) :
                            shuffleCards[60] === 2 ? shuffleCards.slice(26, 39) :
                            shuffleCards.slice(39, 52);
    console.log ('Entered getNextPlayableCard Stage 1 nextPlayerCards =', nextPlayerCards);
    for (let i = 0; i < possibleNextCards.length; i++) {
        const cardIndex = nextPlayerCards.indexOf(possibleNextCards[i]);
        console.log ('Entered getNextPlayableCard Stage 2 cardIndex =', cardIndex);
        if (cardIndex !== -1) {
            nextPlayableCard[i] = 1;
            matchingIndices = { playerCardIndex: cardIndex, nextPossibleCardIndex: i };

            // Update shuffleCards with the matched card
            shuffleCards[52 + i] = nextPlayerCards[cardIndex];
            if (shuffleCards[60] === 0) {
                shuffleCards[cardIndex] = 0;
            } else if (shuffleCards[60] === 1) {
                shuffleCards[13 + cardIndex] = 0;
            } else if (shuffleCards[60] === 2) {
                shuffleCards[26 + cardIndex] = 0;
            } else if (shuffleCards[60] === 3) {
                shuffleCards[39 + cardIndex] = 0;
            }
            break; // Stop further matches after finding the first one
        }
    }
    shuffleCards[60] = (shuffleCards[60] === 3) ? 0 : shuffleCards[60] + 1;
    shuffleCards[61] = shuffleCards[61] + 1;
    console.log ('Exited getNextPlayableCard shuffleCards[60] =', shuffleCards[60]);
    return {
        shuffleCards: shuffleCards,
        // matchingIndices: matchingIndices
    };
}

function checkStoppingCondition(cards) {
    return (
            cards.slice(0, 13).every(card => card === 0) ||
            cards.slice(13, 26).every(card => card === 0) ||
            cards.slice(26, 39).every(card => card === 0) ||
            cards.slice(39, 52).every(card => card === 0) ||
            cards[61] === 75
        );
    }


module.exports = function(io) {
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
            let shuffledCards = shuffle(cards);
            for (let i = 0; i < 10; i++) {
                shuffledCards.push(0);
            }

            // Send response
            res.json({
                table_index: parseInt(requestTableIndex), // Convert string to integer
                card_data: shuffledCards, // Shuffled list of numbers
            });

            // Emit the 'update_all_cards' event at 5000ms intervals until the stopping condition is met
            const intervalId = setInterval(() => {
                shuffledCards = getNextPlayableCard(shuffledCards).shuffleCards;
                io.emit('update_all_cards', shuffledCards);

                // Check if the stopping condition is met
                if (checkStoppingCondition(shuffledCards)) {
                    clearInterval(intervalId);
                }
            }, 5000); // 5000 milliseconds = 5 seconds

        } catch (error) {
            // Handle errors
            console.error('Error processing update_all_cards request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router; // Make sure to return the router
};
