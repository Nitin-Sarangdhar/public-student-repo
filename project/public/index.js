const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
    
    // Handle other Socket.IO events as needed
});

// Middleware to parse JSON
app.use(express.json());

// Use Morgan middleware for logging incoming requests
app.use(morgan('dev'));

// Import routes
const apiRoutes = require('./routes/api');

// Use routes
app.use('/api', apiRoutes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Pass the io object to routes or middleware if needed
app.use((req, res, next) => {
  req.io = io;
  next();
});

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

const listEndpoints = require('express-list-endpoints');

// Print out all registered routes
console.log(listEndpoints(app));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


