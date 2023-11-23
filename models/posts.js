import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, minlength: 3, default: "Untitled Post" },
  post: { type: String, minlength: 3, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  isPublished: { type: Boolean, default: false },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
