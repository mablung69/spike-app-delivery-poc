const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const apiRouter = require('./api/routes');
const webPagesRouter = require('./webPages/routes');
const app = express();

//Use environment variables from Dockerfile e.g PORT and HOST
const PORT = process.env.PORT || 8080;
const IP = process.env.HOST || "0.0.0.0";

//Replace project-folder with the name of your project in the /dist folder after the build
const projectFolder = 'public';

app.use(express.static(`${__dirname}/${projectFolder}`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: __dirname + '/layouts',
}));

// Web pages Router
app.use('/', webPagesRouter);

// API Router
app.use('/api/v1/', apiRouter);

app.all('/*', function(req, res, next) {
    res.sendFile(`${projectFolder}/index.html`, { root: __dirname });
});

app.listen(PORT, IP, () => {
    console.log(`
    ==================================
    Server is running on ${IP}:${PORT}
    Serve from ${__dirname}/${projectFolder}
    ==================================
    `);
})
