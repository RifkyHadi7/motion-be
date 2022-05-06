var express = require('express');
var router = express.Router();
const controller = require('../controllers/rapor.controller');

router.get('/', controller.getAllRapor);
router.get('/:turn/:nim/:year', controller.getRaporByTurnNIMYear);
router.post('/', controller.addRapor);
router.delete('/:id_rapor', controller.deleteRapor);

module.exports = router
