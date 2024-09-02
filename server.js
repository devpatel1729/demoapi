const express = require('express');
const os = require('os');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get server's local IP addresses
app.get('/local-ip', (req, res) => {
  console.log('Received request for /local-ip'); // Log to verify the request

  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }

  res.json({ ips });
});

// Endpoint to get the client's IP address
app.get('/client-ip', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ clientIp });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
