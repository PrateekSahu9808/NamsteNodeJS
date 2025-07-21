const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDb().then(() => {
  console.log("DataBase Connection established ....");
  app.listen(3001, () => {
    console.log("server listining on port 3001");
  });
});
