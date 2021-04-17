const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const apiRouter = require('./api/routes');
const webPagesRouter = require('./webPages/routes');
const app = express();

//Use environment variables from Dockerfile e.g PORT and HOST
const PORT = process.env.PORT || 8080;
const IP = process.env.HOST || "0.0.0.0";

// API Router
app.use('/api/v1/', apiRouter);

// Web pages Router
require('./webPages/routes')(app, express);

app.listen(PORT, IP, () => {
    console.log(`
    ==================================
    Server is running on ${IP}:${PORT}
    ==================================
    `);
})