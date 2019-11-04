const Post = require("../models/Post");

exports.getPostList = async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ msg: err });
  }
};
exports.addPost = async (req, res, next) => {
  try {
    const post_data = req.body;
    console.log({ post_data });
    if (post_data.title === "" || post_data.content === "")
      return res.status(400).json({ msg: "Title and content are required" });
    const post = new Post(post_data);
    await post.save();
    return res.status(200).json({ msg: "Post is added successfully" });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ msg: err });
  }
};
exports.updatePost = async (req, res, next) => {
  try {
    const { id, ...post_data } = req.body;
    const post = await Post.findOne({ id });
    post.title = post_data.title;
    post.content = post_data.content;
    await post.save();

    return res.status(200).json({ msg: "Post is updated successfully" });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ msg: err });
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    await Post.deleteOne({ id: post_id });
    return res.status(200).json({ msg: "Post is deleted successfully" });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ msg: err });
  }
};
