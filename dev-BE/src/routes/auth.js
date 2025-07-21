const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");

//!sign up api
authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //!Validation
    validateSignupData(req);
    //!Encrypt pass
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User Created Successfully", responseObj: savedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//!login api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId is not present");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
      });
      res.send(user);
    } else {
      throw new Error("Password  is not correct");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//!logout api
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
module.exports = authRouter;
