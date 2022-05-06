var express = require('express');
var router = express.Router();
const controller = require('../controllers/departemen.controller');

router.get('/', controller.getAllDepartemen);

module.exports = router
