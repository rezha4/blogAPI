import passport from "passport";
import User from "../models/users";
import bcrypt from "bcryptjs";

const userLoginPost = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

const userSignupPost = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) {
          reject(err);
        }
        resolve(hashed);
      });
    });
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

const userLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { userLoginPost, userSignupPost, userLogout };
