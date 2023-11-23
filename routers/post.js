import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("helo from post");
});

module.exports = router;
