import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/users";
import bcrypt from "bcryptjs";

const app = express();

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import indexRouter from "./routers/user";
import postRouter from "./routers/post";
import commentRouter from "./routers/comment";
import { brotliCompressSync } from "zlib";

app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`
  _______  _______  _______ 
 |   _   ||       ||       |
 |  |_|  ||    _  ||    _  |
 |       ||   |_| ||   |_| |
 |       ||    ___||    ___|
 |   _   ||   |    |   |    
 |__| |__||___|    |___|    ${process.env.PORT}!`);
});
