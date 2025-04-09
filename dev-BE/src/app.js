const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/database");
const app = express();
app.use(express.json());
//^ For Saving the data to our data base first we need require our modal

const User = require("./models/user");
//!sign up api
app.post("/signup", async (req, res) => {
  //HardCode Ways
  // const userObject = {
  //   firstName: "hgh",
  //   lastName: "ghg",
  //   emailId: "ghgh@gmail.com",
  //   password: "hgh@1234",
  // };
  // //*Creating a new instance of the user Modal

  // try {
  //   const user = new User(userObject);
  //   await user.save();
  //   res.send("User Added SuccessFull🚀🚀");
  // } catch (error) {
  //   res.status(400).send("Error Saving the user");
  // }
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User Created Successfully", responseObj: savedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//!GET Single User By email
// app.get("/user", async (req, res) => {
//   try {
//     //here we can also findOne
//     const userEmail = req.body.emailId;
//     const user = await User.find({ emailId: userEmail });
//     if (user.length) {
//       res.send(user);
//     } else {
//       res.status(404).send("user not found (❁´◡`❁)");
//     }
//   } catch (error) {
//     res.status(400).send("Something Went Wrong");
//   }
// });

//!get user by id normal way
// app.get("/user/id", async (req, res) => {
//   try {
//     const userId = req.body._id;
//     const filterUserId = await User.findById({ _id: userId });
//     res.send(filterUserId);
//   } catch (error) {
//     res.status(400).send("Something Went Wrong------");
//   }
// });/

//!get user by emailid qeryparam
app.get("/user/by-email", async (req, res) => {
  try {
    const userEmail = req.query.emailId;
    const user = await User.find({ emailId: userEmail });

    if (user.length) {
      res.send(user);
    } else {
      res.status(404).send("User not found (❁´◡`❁)");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
//!Get user by ID (use URL parameter)
app.get("/user/:_id", async (req, res) => {
  const userId = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid user ID");
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not Found");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).send("Something went wrong .......");
  }
});
//!Feed Api - GET /feed - get all the user from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(401).send("Something went wrong 😏😏😏");
  }
});
//!delete the user by userId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(`${user} deleted sucssefully`);
  } catch (error) {
    res.status(401).send("Something went wrong 😏😏😏");
  }
});

//!update by patch
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(401).send("Something went wrong 😏😏😏" + error.message);
  }
});
connectDb().then(() => {
  console.log("DataBase Connection established ....");
  app.listen(3001, () => {
    console.log("server listining on port 3001");
  });
});
