require('dotenv').config();
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db_conn = require('./server/mongoose');
const jwt = require('express-jwt');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

const mongo = require('./server/models/user');
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// get socket controller
const socket = require('./server/routes/socket')(server);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use(jwt({ secret: process.env.JWT_SECRET || 'secret' }).unless({
  path: [
    { url: '/register', methods: ['GET']  },
    { url: '/login', methods: ['GET']  },
    { url: '/user-details', methods: ['GET']  },
    { url: '/api/users', methods: ['POST']  },
    { url: '/api/users/:id', methods: ['GET']  },
    { url: '/api/session/', methods: ['POST']  },
    '/socket.io/'
  ]
}));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

server.listen(port, () => console.log(`API running on localhost:${port}`));