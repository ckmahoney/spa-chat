const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Apply Helmet middleware to secure the application
app.use(
  helmet({
    // ... Helmet configurations
  })
);

// Set a secret key for JWT
const secretKey = 'your-secret-key';

// Middleware to verify JWT token
// ...

// Routes
// ...

// Determine if SSL should be enabled based on the environment
const isDevMode = process.env.DEV_MODE === 'true';

// Create the server
if (isDevMode) {
  // Development mode, use regular HTTP server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
} else {
  // Production mode, use HTTPS server
  const sslCertPath = process.env.SSL_CERT;
  const sslKeyPath = process.env.SSL_KEY;

  if (!sslCertPath || !sslKeyPath) {
    console.error('SSL certificate and key paths are not defined in the environment.');
    process.exit(1);
  }

  const sslOptions = {
    cert: fs.readFileSync(sslCertPath),
    key: fs.readFileSync(sslKeyPath),
  };

  https.createServer(sslOptions, app).listen(3000, () => {
    console.log('Server started on port 3000 with HTTPS enabled');
  });
}