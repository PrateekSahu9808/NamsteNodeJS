const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mailprateeksahu:9LjpNHaCI9DrWTGo@namstenodejs.4s3pz.mongodb.net/devTinder",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
    }
  );
};

module.exports = connectDB;
connectDB()
  .then(async () => {
    await mongoose.connection.syncIndexes();
    console.log("Indexes synced successfully");
    console.log("data base connected");
  })
  .catch(err => console.log(err));
