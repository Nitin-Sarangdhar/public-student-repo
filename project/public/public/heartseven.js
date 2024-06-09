  // Get the values of specific parameters from the previous page
    // const param1 = urlParams.get("param1");   // demo = 0; single = 1; multi start = 2; multi join = 3
    // const param2 = urlParams.get("param2");   // tableIndex
    // const param3 = urlParams.get("param3");   // Playername
    // const param4 = urlParams.get("param4");   // PlayerCount Min = 0, Max = 3
    // temporary definition
    const param1 = 0; 
    const param2 = 0;
    const param3 = 0; 
    const requestTableIndex = param2;
    let myVariable = 0;

 //   import { resetPlayerPoints, addPlayerPoints, playerPoints } from './playerPoints.js';
 const playerPoints = Array.from({ length: 100 }, () => Array(4).fill(0));
 // Function to reset player points
 function resetPlayerPoints() {
    for (let i = 0; i < playerPoints.length; i++) {
        for (let j = 0; j < playerPoints[i].length; j++) {
            playerPoints[i][j] = 0;
        }
    }
}

function calcPlayerPoints(carddata) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            if (carddata[j + i * 13] < 14) {
                playerPoints[carddata[61]][i] += carddata[j + i * 13];
            } else if (carddata[j + i * 13] < 27) {
                playerPoints[carddata[61]][i] += carddata[j + i * 13] - 13;
            } else if (carddata[j + i * 13] < 40) {
                playerPoints[carddata[61]][i] += carddata[j + i * 13] - 26;
            } else if (carddata[j + i * 13] < 53) {
                playerPoints[carddata[61]][i] += carddata[j + i * 13] - 39;
            }
        }
    }
    console.log ("calcPlayerPoints, carddata[61] =", carddata[61], playerPoints[carddata[61]]);
    
}

 

    const substitutionMap = {
    0: { value: "B", color: "black" },
    1: { value: "A♠", color: "black" },
    2: { value: "2♠", color: "black" },
    3: { value: "3♠", color: "black" },
    4: { value: "4♠", color: "black" },
    5: { value: "5♠", color: "black" },
    6: { value: "6♠", color: "black" },
    7: { value: "7♠", color: "black" },
    8: { value: "8♠", color: "black" },
    9: { value: "9♠", color: "black" },
    10: { value: "10♠", color: "black" },
    11: { value: "J♠", color: "black" },
    12: { value: "Q♠", color: "black" },
    13: { value: "K♠", color: "black" },
    14: { value: "A♥", color: "red" },
    15: { value: "2♥", color: "red" },
    16: { value: "3♥", color: "red" },
    17: { value: "4♥", color: "red" },
    18: { value: "5♥", color: "red" },
    19: { value: "6♥", color: "red" },
    20: { value: "7♥", color: "red" },
    21: { value: "8♥", color: "red" },
    22: { value: "9♥", color: "red" },
    23: { value: "10♥", color: "red" },
    24: { value: "J♥", color: "red" },
    25: { value: "Q♥", color: "red" },
    26: { value: "K♥", color: "red" },
    27: { value: "A♦", color: "red" },
    28: { value: "2♦", color: "red" },
    29: { value: "3♦", color: "red" },
    30: { value: "4♦", color: "red" },
    31: { value: "5♦", color: "red" },
    32: { value: "6♦", color: "red" },
    33: { value: "7♦", color: "red" },
    34: { value: "8♦", color: "red" },
    35: { value: "9♦", color: "red" },
    36: { value: "10♦", color: "red" },
    37: { value: "J♦", color: "red" },
    38: { value: "Q♦", color: "red" },
    39: { value: "K♦", color: "red" },
    40: { value: "A♣", color: "black" },
    41: { value: "2♣", color: "black" },
    42: { value: "3♣", color: "black" },
    43: { value: "4♣", color: "black" },
    44: { value: "5♣", color: "black" },
    45: { value: "6♣", color: "black" },
    46: { value: "7♣", color: "black" },
    47: { value: "8♣", color: "black" },
    48: { value: "9♣", color: "black" },
    49: { value: "10♣", color: "black" },
    50: { value: "J♣", color: "black" },
    51: { value: "Q♣", color: "black" },
    52: { value: "K♣", color: "black" },
   100: { value: "B", color: "black" } 
    // card.style.color = 'red';
  };  
  let runningLocally = true; // Set this to true for local testing
    //const runningLocally = false; // Set this to true for local testing
  if (window.location.hostname === 'localhost') {
      console.log('Client is connecting to the local server.');
      runningLocally = true;
    } else {
      console.log('Client is connecting to a remote server.');
      runningLocally = false;
    }

    // Determine the base URL to use based on the environment
  // const baseUrl = runningLocally ? 'http://localhost:8080' : 'https://zpekpk8jsx.us-east-2.awsapprunner.com';
    // Construct the URLs for API calls
  // const cardsUrl = baseUrl + `/cards`;
  // const updateCardsUrl = baseUrl + `/update_all_cards/${requestTableIndex}`;
  const baseUrl = runningLocally ? 'http://localhost:3000' : '*';
  const cardsUrl = baseUrl + `/api/cards`;
  const updateCardsUrl = `${baseUrl}/api/update_all_cards`
  const trialPostUrl = `${baseUrl}/api/trialpost`;
  function disableButton(button, data) {
    // Disable the button to prevent double-clicking
       var myCurrentPolicy = 0;  // Corrected the variable name to match the one used later
       const policyMap = {
         0: "Beginner",
         1: "Intermediate",
         2: "Advanced",
         3: "Expert"
       };
       button.disabled = true;
       //const sound = document.getElementById("sound");
       // if (sound.paused || sound.ended) {
       //     sound.currentTime = 0;
       // }
        
       // Play the audio
       // sound.play();
       // setTimeout(() => {
       // sound.pause();
       // }, 1000); // 2000 milliseconds (2 seconds)
   

       if (data == '66' || data == '67' || data == '68' || data == '69') {
             myCurrentPolicy = myVariable;  // Corrected variable name
             myVariable = parseInt(data) - 66;
             if (myCurrentPolicy == myVariable) {
                 alert('Your current and new policy is ' + policyMap[myCurrentPolicy]);  // Corrected function name   
             }
             else {
                 alert('Your current policy is ' + policyMap[myCurrentPolicy] + ' Your new policy is ' + policyMap[myVariable] + ' New policy will take effect after Deal is clicked');  // Corrected function name
             }
       } else if (data == "70") { 
             window.location.href = "configuration5.html"; // Change to your login page URL
       } else {   
              if (data == "65") {
              data = (parseInt(data) + myVariable).toString();
              console.log("Deal button clicked", data);
              // Perform your action here (e.g., updateAllCards)
              fetchData(param2, data);}              
       }
    // Re-enable the button after a delay (e.g., 2 seconds)
    setTimeout(() => {
        button.disabled = false;
    }, 2000); // 2000 milliseconds (2 seconds)
    }

    // Add a click event listener to the "Help" button
  //  helpButton.addEventListener('click', toggleHelpMessage);

  function fetchData4() {
    // Send the button click event to the server
    fetch(`${trialPostUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Empty body
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }



  function fetchData3() {
    fetch('/api/trial')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching data:', error));
  }

  function fetchData1() {
            fetch('/api/data')
                .then(response => response.json())
                .then(data => {
                    console.log('Trial request successful:', data);
                    alert('Trial request successful. Check console for response.');
                })
                .catch(error => {
                    console.error('Error making trial request:', error);
                    alert('Error making trial request. Check console for details.');
                });
        }

  function fetchData(requestTableIndex, buttonId) {
    const data = {
        action: 'buttonClick',
        buttonId: buttonId,
    };

    // Log the request going out, including the buttonId
    console.log('Sending request to:', `${updateCardsUrl}/${requestTableIndex}`, 'with buttonId:', buttonId);

    // Send the button click event to the server
    fetch(`${updateCardsUrl}/${requestTableIndex}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    // Extract table_index and card_data from the response data
    const tableIndex = data.table_index;
    const carddata = data.card_data;

    // Use the extracted data as needed
    console.log("Table Index:", tableIndex, requestTableIndex);
    console.log("Table Cards:", carddata);

    // Perform further actions if necessary, e.g., update the UI
    if (requestTableIndex == tableIndex) {
        // Array of card content for player 1
        console.log("Table Index1:", tableIndex, requestTableIndex);
        resetPlayerPoints();
        tableKeeping(requestTableIndex, carddata);
    }

    // Return carddata if needed for further chaining
    return carddata;
    })
    .catch(error => {
     console.error('Error fetching data:', error);
    });

  }



  function tableKeeping(requestTableIndex, carddata) {
    // Example function to handle card data
    console.log(`Table ${requestTableIndex} cards:`, carddata);
    // Player 1
    const player1Header = document.getElementById('player1-header');
    const player2Header = document.getElementById('player2-header');
    const player3Header = document.getElementById('player3-header');
    const player4Header = document.getElementById('player4-header');
    if (carddata[60] == 0) {
      player1Header.classList.add('highlight');
      player2Header.classList.remove('highlight');
      player3Header.classList.remove('highlight');
      player4Header.classList.remove('highlight');
    } else if (carddata[60] == 1) {
      player1Header.classList.remove('highlight');
      player2Header.classList.add('highlight');
      player3Header.classList.remove('highlight');
      player4Header.classList.remove('highlight');
    } else if (carddata[60] == 2) {
      player1Header.classList.remove('highlight');
      player2Header.classList.remove('highlight');
      player3Header.classList.add('highlight');
      player4Header.classList.remove('highlight');
    } else if (carddata[60] == 3) {
      player1Header.classList.remove('highlight');
      player2Header.classList.remove('highlight');
      player3Header.classList.remove('highlight');
      player4Header.classList.add('highlight');
    } else {}
    
    const player1Footer = document.getElementById('player1-footer');
    const player2Footer = document.getElementById('player2-footer');
    const player3Footer = document.getElementById('player3-footer');
    const player4Footer = document.getElementById('player4-footer');

if (carddata.slice(0, 13).every(value => value === 0)) {
    player1Footer.textContent = "Player 1 Won";
    player2Footer.textContent = "Player 2 Lost by " + playerPoints[carddata[61]][1] + " points";
    player3Footer.textContent = "Player 3 Lost by " + playerPoints[carddata[61]][2] + " points";
    player4Footer.textContent = "Player 4 Lost by " + playerPoints[carddata[61]][3] + " points";
    player1Footer.classList.add('highlight');
    plotGraph(playerPoints[carddata[61]]);
} else if (carddata.slice(13, 26).every(value => value === 0)) {
    player2Footer.textContent = "Player 2 Won";
    player1Footer.textContent = "Player 1 Lost by " + playerPoints[carddata[61]][0] + " points";
    player3Footer.textContent = "Player 3 Lost by " + playerPoints[carddata[61]][2] + " points";
    player4Footer.textContent = "Player 4 Lost by " + playerPoints[carddata[61]][3] + " points";
    player2Footer.classList.add('highlight');
    plotGraph(playerPoints[carddata[61]]);
} else if (carddata.slice(26, 39).every(value => value === 0)) {
    player3Footer.textContent = "Player 3 Won";
    player1Footer.textContent = "Player 1 Lost by " + playerPoints[carddata[61]][0] + " points";
    player2Footer.textContent = "Player 2 Lost by " + playerPoints[carddata[61]][1] + " points";
    player4Footer.textContent = "Player 4 Lost by " + playerPoints[carddata[61]][3] + " points";
    player3Footer.classList.add('highlight');
    plotGraph(playerPoints[carddata[61]]);

} else if (carddata.slice(39, 52).every(value => value === 0)) {
    player4Footer.textContent = "Player 4 Won";
    player1Footer.textContent = "Player 1 Lost by " + playerPoints[carddata[61]][0] + " points";
    player2Footer.textContent = "Player 2 Lost by " + playerPoints[carddata[61]][1] + " points";
    player3Footer.textContent = "Player 3 Lost by " + playerPoints[carddata[61]][2] + " points";
    player4Footer.classList.add('highlight');
    plotGraph(playerPoints[carddata[61]]);

} else {
    player1Footer.textContent = "Player 1 Footer";
    player2Footer.textContent = "Player 2 Footer";
    player3Footer.textContent = "Player 3 Footer";
    player4Footer.textContent = "Player 4 Footer";
    player1Footer.classList.remove('highlight');
    player2Footer.classList.remove('highlight');
    player3Footer.classList.remove('highlight');
    player4Footer.classList.remove('highlight');
}

    

    for (let i = 0; i < 13; i++) {
        const cardButton = document.getElementById(`player1card${i + 1}`);
        if (cardButton) {
          const cardValue = substitutionMap[carddata[i]];
          cardButton.textContent = cardValue.value; // Update button text with card value
          cardButton.style.color = cardValue.color; // Set the color of the button text
          if (cardValue.value === 'B') {
            cardButton.style.backgroundColor = 'white'; // Change background color to red for value 0 (adjust color as needed)
          } else {
            cardButton.style.backgroundColor = 'yellow'; // Change background color to red for value 0 (adjust color as needed)
          } 
        }
      }

    // Player 2
    for (let i = 0; i < 13; i++) {
        const cardButton = document.getElementById(`player2card${i + 1}`);
        if (cardButton) {
            const cardValue = substitutionMap[carddata[i+13]];
            cardButton.textContent = cardValue.value; // Update button text with card value
            cardButton.style.color = cardValue.color; // Set the color of the button text
            if (cardValue.value === 'B') {
             cardButton.style.backgroundColor = 'white'; // Change background color to red for value 0 (adjust color as needed)
            } else {
              cardButton.style.backgroundColor = 'yellow'; // Change background color to red for value 0 (adjust color as needed)
            }
        }
      }

    // Player 3
    for (let i = 0; i < 13; i++) {
        const cardButton = document.getElementById(`player3card${i + 1}`);
        if (cardButton) {
            const cardValue = substitutionMap[carddata[i+26]];
            cardButton.textContent = cardValue.value; // Update button text with card value
            cardButton.style.color = cardValue.color; // Set the color of the button text
            if (cardValue.value === 'B') {
             cardButton.style.backgroundColor = 'white'; // Change background color to red for value 0 (adjust color as needed)
            } else {
             cardButton.style.backgroundColor = 'yellow'; // Change background color to red for value 0 (adjust color as needed)
            }
        }
      }     

    // Player 4
    for (let i = 0; i < 13; i++) {
        const cardButton = document.getElementById(`player4card${i + 1}`);
        if (cardButton) {
            const cardValue = substitutionMap[carddata[i+39]];
            cardButton.textContent = cardValue.value; // Update button text with card value
            cardButton.style.color = cardValue.color; // Set the color of the button text            
            if (cardValue.value === 'B') {
              cardButton.style.backgroundColor = 'white'; // Change background color to red for value 0 (adjust color as needed)
            } else {
              cardButton.style.backgroundColor = 'yellow'; // Change background color to red for value 0 (adjust color as needed)
            }
        }
      }
    // Update table cards
    for (let i = 0; i < 8; i++) {
        const cardButton = document.getElementById(`tablecard${i + 1}`);
        if (cardButton) {
            const cardValue = substitutionMap[carddata[i+52]];
            cardButton.textContent = cardValue.value; // Update button text with card value
            cardButton.style.color = cardValue.color; // Set the color of the button text            
            if (cardValue.value === 'B') {
              cardButton.style.backgroundColor = 'white'; // Change background color to red for value 0 (adjust color as needed)
            } else {
              cardButton.style.backgroundColor = 'yellow'; // Change background color to red for value 0 (adjust color as needed)
            }
        }
    }
  
  }

// Connect to the server
const socket = io.connect(baseUrl);
// Listen for the connect event

socket.on('connect', () => {
    console.log('Connected to WebSocket');
});

// Listen for the disconnect event
socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
});


socket.on('update_all_cards', (shuffledCards) => {
            // Handle the received shuffled cards data here
            console.log('Received shuffled cards:', shuffledCards);
            calcPlayerPoints(shuffledCards);
            tableKeeping(requestTableIndex, shuffledCards);
            // Get the audio element by its ID
            const sound = document.getElementById("sound");

            if (sound) {
                // Always reset the audio to the beginning and play it
                sound.currentTime = 0;
                sound.play()
                    .then(() => {
                        // Set a timeout to pause the audio after 2 seconds
                        setTimeout(() => {
                            sound.pause();
                        }, 100); // 2000 milliseconds = 2 seconds
                    })
                    .catch(error => {
                        console.error('Error playing the sound:', error);
                    });
            } else {
                console.error('Audio element with ID "sound" not found.');
            }

            // Perform further actions as needed, such as updating the UI
        });

        let myChart; // Declare myChart variable outside the function scope

function plotGraph(data) {
    if (myChart) {
        myChart.destroy(); // Destroy existing chart if it exists
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
            datasets: [{
                label: 'Player Points',
                data: data,
                backgroundColor: 'blue', 
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black' // Set the color of the ticks on the y-axis to black
                    }
                },
                x: {
                    ticks: {
                        color: 'black' // Set the color of the ticks on the x-axis to black
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'black' // Set the color of the legend labels to black
                    }
                }
            }            
        }
    });
}
