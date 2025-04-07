const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});
//!here we are creating the user modal where first argument is the name of modal, second one is schema
const User = mongoose.model("User", userSchema);
module.exports = User;

//&==>>>>Database -->Collection-->Document
