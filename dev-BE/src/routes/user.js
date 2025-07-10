const express = require("express");
const { userAuth } = require("../middelwares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res.json({
      message: "data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    req.statusCode(400).send("Error: " + err.message);
  }
});
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        {
          fromUserId: loggedInUser._id,
          stats: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);
    const data = connectionRequest.map(row => {
      if (row.fromUserid._id.toString() === loggedInUser._id.toString()) {
        return row.fromUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch {
    res.status(400).send({ message: err.message });
  }
});
userRouter.get("/feed?page=1&limit=10", async (req, res) => {
  try {
    const loggedInUser = req.user;
    //Find all the connection request(send + received)
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");
    const hideUserFromFeed = new Set();
    connectionRequest.forEach(req => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select("firstName", "lastName");
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
userRouter.get("/feed", async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    //Find all the connection request(send + received)
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");
    const hideUserFromFeed = new Set();
    connectionRequest.forEach(req => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName", "lastName")
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
