import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// import User from "./models/users";

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(mongoDB);
//   await createUser("rezha", process.env.USER_PASSWORD);
//   mongoose.connection.close();
// }

// async function createUser(username, password) {
//   const user = new User({ username, password });
//   await user.save();
//   console.log(`${username} added to DB`);
// }

const indexRouter = require("./routers/index");
const postRouter = require("./routers/post");
const commentRouter = require("./routers/comment");

app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}!`);
});
