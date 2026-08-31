const express = require("express");
const upload = require("../config/multer.config");
const { createController } = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", upload.array("images", 5), createController)

module.exports = router