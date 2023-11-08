const express = require('express');
const expressWs = require('express-ws');
const app = express();
expressWs(app);

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/:page', (req, res) => {
  const pageName = req.params.page;
  const filePath = path.join(__dirname, 'public', 'html', pageName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.sendFile(path.join(__dirname, 'dist', 'error-page', '404.html'));
    } else {
      return res.sendFile(filePath);
    }
  });
});

app.use('/activate-next-app', (req, res) => {
  const nextApp = require('./next-app');
  nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
      return nextApp.getRequestHandler()(req, res);
    });
    console.log('Next.js application is enabled.');
  });
});

// WebSocket endpoint for Web 3 interactions
app.ws('/web3', (ws, req) => {
  ws.on('message', (message) => {
    // Handle Web 3 interaction here
    console.log(`Received message: ${message}`);
    // Send a response back to the client
    ws.send('Response from Web 3 server');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});