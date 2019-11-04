const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);
