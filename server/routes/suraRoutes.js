const express = require('express');

const { getSura } = require('../controller/suraController');

const router = express.Router();

router.get('/get/:suraNumber', getSura);

module.exports = router;
