const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middelwares/auth");
//!profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    //this user already set by userAuth middleware
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = profileRouter;
