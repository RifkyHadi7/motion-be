var express = require("express");
var router = express.Router();
const controller = require("../controllers/jabatan.controller");

router.get("/", controller.getAllJabatan);
router.get("/:id", controller.getJabatanById);
router.get("/:id/users", controller.getUserByIdJabatan);
router.get("/:id/aspek", controller.getAspekByIdJabatan);

module.exports = router;
