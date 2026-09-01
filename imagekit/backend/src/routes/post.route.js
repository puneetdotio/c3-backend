const express = require("express");
const upload = require("../config/multer.config");
const { createPostController, getAllPostController } = require("../controllers/post.controller");

const router = express.Router();

// create a post
router.post("/create", upload.single("image"), createPostController)

// get post
router.get("/getAllPost", getAllPostController)

module.exports = router;