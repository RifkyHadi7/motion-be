var express = require('express');
var router = express.Router();
const controller = require('../controllers/aspek.controller');

router.get('/', controller.getAllAspek);
router.get('/:column/:value', controller.getAspekByCol);
router.post('/', controller.addAspek);
router.put('/:id_aspek', controller.updateAspek);
router.delete('/:id_aspek', controller.deleteAspek);

module.exports = router
