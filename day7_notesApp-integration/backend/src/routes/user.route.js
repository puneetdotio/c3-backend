const express = require("express");
const upload = require("../config/multer.config");
const { createController } = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", upload.single("image"), createController)

module.exports = router;