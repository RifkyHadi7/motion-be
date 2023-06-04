const express = require("express");
const router = express.Router();
const controller = require("../controllers/rapor.controller");

router.get("/", controller.getAllRapor);
router.post("/", controller.addRapor);
router.put("/:id", controller.editRapor);
router.delete("/:id", controller.deleteRapor);

module.exports = router;
