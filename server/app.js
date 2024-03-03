const express = require('express');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

module.exports = app;
