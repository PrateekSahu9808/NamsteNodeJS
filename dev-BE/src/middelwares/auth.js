const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req, res, next) => {
  const token = "qqq";
  const isAdminAuth = token === "qqq";
  if (!isAdminAuth) {
    res.status(401).send("unautorized");
  } else {
    next();
  }
};
// const userAuth = (req, res, next) => {
//   const token = "qqq";
//   const isAdminAuth = token === "qqq";
//   if (!isAdminAuth) {
//     res.status(401).send("unautorized");
//   } else {
//     next();
//   }
// };/
const userAuth = async (req, res, next) => {
  //!read the token from the req cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("PLease Enter Valid Token");
    }
    const decodeObj = await jwt.verify(
      token,
      "Dev@Tiner@sscchhrryyttiiooppkkjjhhggdftshhtgg"
    );
    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("ERROR" + error.message);
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
