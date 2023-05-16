const express = require("express");
const router = express.Router();
const controller = require("../controllers/kegiatan.controller");

router.get("/", controller.getAllKegiatan);
router.get("/:id", controller.getKegiatanById);
router.post("/", controller.addKegiatan);
router.put("/:id", controller.updateKegiatan);
router.delete("/:id", controller.deleteKegiatan);

module.exports = router;
