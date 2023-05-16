const express = require("express");
const router = express.Router();
const controller = require("../controllers/proker.controller");

router.get("/", controller.getAllProker);
router.get("/:id", controller.getProkerById);
router.get("/:id/pj_bem", controller.getPJByIdProker);

module.exports = router;
