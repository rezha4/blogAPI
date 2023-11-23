import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi from index");
});

module.exports = router;
