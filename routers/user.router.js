const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer();

router.get("/", controller.getAllUser);
router.get("/:nim", controller.getUserByNim);
router.get(
	"/kementerian/:id_kementerian/jabatan/:id_jabatan",
	controller.getUserByKementerianJabatan
);
router.get("/:nim/rapor", controller.getRaporByNim);
router.get("/:nim/rapor/:turn", controller.getRaporByTurnNim);
router.get("/:nim/absensi/:turn", controller.getAbsensiByTurnNim);
router.post("/", upload.single("foto"), controller.addUser);
router.post("/login", controller.login);
router.put("/:nim", controller.updateUser);
router.delete("/:nim", controller.deleteUser);

module.exports = router;
