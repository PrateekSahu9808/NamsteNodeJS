const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middelwares/auth");
const { validateEditProfileData } = require("../utils/validation");
//!profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    //this user already set by userAuth middleware
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: loggedInUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error);
  }
});
module.exports = profileRouter;
