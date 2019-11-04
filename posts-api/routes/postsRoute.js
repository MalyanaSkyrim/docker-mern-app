const express = require("express");
const Post = require("../models/Post");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getPostList);
router.post("/", postController.addPost);
router.patch("/", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

module.exports = router;
