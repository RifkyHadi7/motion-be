const express = require("express");
const router = express.Router();
const controller = require("../controllers/bestStaff.controller");

router.get("/", controller.getAllBestStaff);
router.get("/:month", controller.getBestStaffByMonth);
router.post("/", controller.addBestStaff);
router.put("/:id", controller.updateBestStaff);
router.delete("/:id", controller.deleteBestStaff);
module.exports = router;
