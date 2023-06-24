const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Secret key used to sign JWTs
const secretKey = 'your-secret-key';

// In-memory storage for messages
let messages = [];

// Endpoint for retrieving all messages (unauthenticated)
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Middleware for verifying access token
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach the decoded user to the request object
    next();
  });
};

// Endpoint for creating a new message (authenticated)
app.post('/messages', verifyAccessToken, (req, res) => {
  const { user } = req;
  const { text } = req.body;

  const newMessage = {
    user: user.userId,
    text,
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});