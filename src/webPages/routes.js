const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const controller = require('./controller');

module.exports = (app, express) => {

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'hbs');
    app.engine('hbs', hbs({
        extname: 'hbs',
        partialsDir: __dirname + '/layouts',
    }));

    app.use('/static', express.static(path.join(__dirname, '../static')));

    const router = express.Router();
    // parse application/x-www-form-urlencoded
    router.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    // parse application/json
    router.use(bodyParser.json({ limit: '50mb' }));

    router.use((request, response, next) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'POST', 'GET');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    router.get('/', controller.home);

    // Web Page Router
    app.use('/', router);
};
