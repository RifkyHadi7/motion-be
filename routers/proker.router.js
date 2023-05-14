const express = require('express');
const router = express.Router();
const controller = require('../controllers/aspek.controller');

router.get('/', controller.getAllAspek);
router.get('/:column/:value', controller.getAspekByCol);
router.post('/', controller.addAspek);
router.put('/:id', controller.updateAspek);
router.delete('/:id', controller.deleteAspek);

module.exports = router
