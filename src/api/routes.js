const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller');

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
// parse application/json
router.use(bodyParser.json({ limit: '50mb' }));

router.get('/historicalData', controller.historicalData);
router.post('/originDestinyDistance', controller.originDestinationDistanceService);

module.exports = router;
