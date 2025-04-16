const express = require("express");
const { userAuth } = require("../middelwares/auth");
const requestRouter = express.Router();
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send("connection request sent🚀🚀");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = requestRouter;
