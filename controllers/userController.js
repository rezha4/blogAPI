import passport from "passport";
import User from "../models/users";
import { body, validationResult } from "express-validator";

const userLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

export { userLogin };
