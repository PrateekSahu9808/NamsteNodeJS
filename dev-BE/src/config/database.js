const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mailprateeksahu:9LjpNHaCI9DrWTGo@namstenodejs.4s3pz.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
connectDB()
  .then(() => {
    console.log("data base connected");
  })
  .catch(err => console.log(err));
