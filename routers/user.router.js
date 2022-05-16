var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAllUser);
router.get('/:column/:value', controller.getUserByCol);
router.post('/', controller.addUser);
router.post('/login', controller.login);
router.put('/:nim', controller.updateUser);
router.delete('/:nim', controller.deleteUser);

module.exports = router
