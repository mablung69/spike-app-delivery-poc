const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
// parse application/json
router.use(bodyParser.json({ limit: '50mb' }));

router.use((_request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST', 'GET');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.get('/', controller.home);

module.exports = router;
