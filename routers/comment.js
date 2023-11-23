import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("gm from comments");
});

module.exports = router;
