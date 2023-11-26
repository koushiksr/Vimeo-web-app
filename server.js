const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('./models/db');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')());
app.use(require('helmet')());
app.use('/vimeo-api', createProxyMiddleware({
  target: 'https://api.vimeo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/vimeo-api': '',  // Remove the '/vimeo-api' prefix when forwarding the request
  },
  headers: {
    'Access-Control-Allow-Origin': '*',  // Adjust this header based on your security requirements
  },
}));
// app.use('/api/students', require('./routes/students'));
app.use('/upload', require('./routes/students'));

// Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );