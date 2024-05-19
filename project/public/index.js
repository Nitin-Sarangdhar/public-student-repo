const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const apiRoutes = require('./routes/api');

// Use routes
app.use('/api', apiRoutes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Handle requests for favicon.ico

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Define a route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to serve new-page.html
app.get('/new-page', (req, res) => {
    console.log('Request received for /new-page');
    
    res.sendFile(path.join(__dirname, 'public', 'new-page.html'));
  });

// Define a route to serve heartseven.html
app.get('/heartseven', (req, res) => {
    console.log('Request received for /heartseven');
    // Log the requested URL
    console.log('Requested URL:', req.url);
    
    // Send the heartseven.html file
    res.sendFile(path.join(__dirname, 'public', 'heartseven.html'));
  
    // Log a message after sending the file
    console.log('heartseven.html sent successfully');
  });

app.get('/audio.mp3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'audio.mp3'));
  });
  
app.get('/api/cards', (req, res) => {
    // Handle the request to fetch cards data
    // Implement your logic here to fetch and send the cards data
    res.json({ message: 'Cards data' }); // Replace this with your actual cards data
});

// Route handler for POST request to /update_all_cards
app.post('/api/update_all_cards/:requestTableIndex', (req, res) => {
    const requestTableIndex = req.params.requestTableIndex;
    const buttonId = req.body.buttonId;

    // Handle the request to update all cards with the provided data
    // Implement your logic here to update the cards based on the button click event
    // You can use requestTableIndex and buttonId in your logic

    res.json({ message: 'Cards updated successfully' }); // Send a response indicating success
});  

// Example API route
app.get('/api/data', (req, res) => {
  // Your API logic here
  res.json({ message: 'API data' });
});


// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle button click event
  socket.on('buttonClick', (data) => {
    // Broadcast the button click event to all connected clients
    io.emit('updatePage', data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


