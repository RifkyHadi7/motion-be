var express = require("express");
var router = express.Router();
const controller = require("../controllers/aspek.controller");

router.get("/", controller.getAllAspek);
router.get("/:id", controller.getAspekById);
router.get("/:column/:value", controller.getAspekByCol);
router.post("/", controller.addAspek);
router.put("/:id", controller.updateAspek);
router.delete("/:id", controller.deleteAspek);

module.exports = router;
