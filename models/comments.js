import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, minlength: 1, required: true },
  author: { type: String },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
