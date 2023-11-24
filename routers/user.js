import express from "express";
const router = express.Router();
import { userLogin } from "../controllers/userController";

router.get("/", (req, res) => {
  res.send("hi from index");
});

router.get("/login", userLogin);

module.exports = router;
