import "dotenv/config";
import mongoose from "mongoose";

import User from "./models/users";

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoose connection error"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  await createUser("rezha", process.env.USER_PASSWORD);
  mongoose.connection.close();
}

async function createUser(username, password) {
  const user = new User({ username, password });
  await user.save();
  console.log(`${username} added to DB`);
}
