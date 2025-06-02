console.log('Starting test server...');
const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Test server is running!');
});

app.listen(5000, () => {
  console.log('Test server running on http://localhost:5000');
});