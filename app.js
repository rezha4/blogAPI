import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Comment from "./models/comments";

const app = express();

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.get("/", (req, res) => {
  res.send("200");
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}!`);
});
