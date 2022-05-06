var express = require('express');
var router = express.Router();
const controller = require('../controllers/jabatan.controller');

router.get('/', controller.getAllJabatan);

module.exports = router
