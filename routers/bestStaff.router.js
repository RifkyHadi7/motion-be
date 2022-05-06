var express = require('express');
var router = express.Router();
const controller = require('../controllers/bestStaff.controller');

router.get('/', controller.getAllBestStaff);
router.get('/:month/:year', controller.getBestStaffByMonthYear);
router.post('/', controller.addBestStaff);
router.put('/:id_best_staff', controller.updateBestStaff);
router.delete('/:id_best_staff', controller.deleteBestStaff);
module.exports = router
