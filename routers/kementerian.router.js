var express = require("express");
var router = express.Router();
const controller = require("../controllers/kementerian.controller");

router.get("/", controller.getAllKementerian);
router.get("/:id", controller.getKementerianById);
router.get("/:id/kegiatan", controller.getKegiatanByIdKementerian);
router.get("/:id/proker", controller.getProkerByIdKementerian);

module.exports = router;
