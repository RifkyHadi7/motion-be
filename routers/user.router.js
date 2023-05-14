const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer();

router.get("/", controller.getAllUser);
router.post("/", upload.single("foto"), controller.addUser);
router.post("/login", controller.login);
router.put("/:nim", controller.updateUser);
router.delete("/:nim", controller.deleteUser);

module.exports = router;
