import express from "express";
import { getAllPost, createPost } from "../controllers/postController";
const router = express.Router();

router.get("/", getAllPost);

router.post("/", createPost);

module.exports = router;
