import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const indexRouter = require("./routers/index");
const postRouter = require("./routers/post");
const commentRouter = require("./routers/comment");

app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}!`);
});
