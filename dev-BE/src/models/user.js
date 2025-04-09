const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value))
          throw new Error("Gender Data is not valid");
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "this is the default description of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
//!here we are creating the user modal where first argument is the name of modal, second one is schema
const User = mongoose.model("User", userSchema);
module.exports = User;

//&==>>>>Database -->Collection-->Document
