import express from "express";
const router = express.Router();
import { userLoginPost, userSignupPost, userLogout } from "../controllers/userController";

router.get("/", (req, res) => {
  res.send("hi from index");
});

router.post("/login", userLoginPost);

router.post("/signup", userSignupPost);

router.post("/logout", userLogout);

module.exports = router;
