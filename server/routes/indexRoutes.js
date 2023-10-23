const express = require('express');

const { getIndex } = require('../controller/indexController');

const router = express.Router();

router.get('/index', getIndex);

module.exports = router;
