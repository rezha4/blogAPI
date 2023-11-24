import express from "express";
const router = express.Router();
import { userLoginPost, userSignupPost } from "../controllers/userController";

router.get("/", (req, res) => {
  res.send("hi from index");
});

router.post("/login", userLoginPost);

router.post("/signup", userSignupPost);

module.exports = router;
