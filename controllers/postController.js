import { validationResult } from "express-validator";
import Posts from "../models/posts";

const getAllPost = async (req, res) => {
  const posts = await Posts.find({}).populate("author").exec();
  if (posts === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  const formattedPosts = posts.map((post) => ({
    title: post.title,
    post: post.post,
    author: post.author.username,
    comments: post.comments,
    isPublished: post.isPublished,
    timeStamp: post.timeStamp,
  }));

  res.status(200).json(formattedPosts);
};

const createPost = async (req, res) => {
  const post = new Posts({
    title: req.body.title,
    post: req.body.post,
    author: req.user,
  });
  try {
    await post.save();
    res.status(201).json({
      message: "post created succesfully",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export { getAllPost, createPost };
