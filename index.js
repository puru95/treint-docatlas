const express = require('express');
const compression = require('compression');
const staticCache = require('express-static-cache');
const path = require('path');

// require('dotenv').config();
const app = express();


// Enable Gzip compression
app.use(compression());

// Enable static file caching
app.use(staticCache(path.join(__dirname, 'public'), {
    maxAge: 86400000  // 1 day in milliseconds
}));


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("App is running on port 3000");
app.listen(3000);
