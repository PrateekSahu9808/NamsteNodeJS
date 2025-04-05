const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middelwares/auth");
// app.use("/", (req, res) => {
// res.send("Hello From ");
// });
// app.use((req, res) => {
//   res.send("Hello From the server👮‍♂️");
// });
//we can gave route also
// app.use("/test", (req, res) => {
//   res.send("Hello From the server");
// });
// app.use("/", (req, res) => {
//   res.send("Hello From ");
// });
//!use -->this will match all the http method  API call to /user
// app.use("/user", (req, res) => {
//   res.send("Hii this is prateek🙋");
// });/
//! this will only handle Get call to /user
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Prateek", lastName: "Sahu" });
// });
// app.post("/user", (req, res) => {
//   console.log("Save the data to the data base");
//   res.send("Data successfully saved to the database");
// });
// app.delete("/user", (req, res) => {
//   console.log("Delete the data to the data base");
//   res.send("Data successfully Deleted from  the database");
// });
// //^------------------------------
// //!here Pattern -->> +,*,?
// app.get("/ab+c", (req, res) => {
//   res.send({ firstName: "Prateek", lastName: "Sahu" });
// });
// //!here it means bc is optional
// app.get("/a(bc)?d", (req, res) => {
//   res.send({ firstName: "Prateek", lastName: "Sahu" });
// });
// //& instead of string i can write the regex
// app.get(/.*fly$/, (req, res) => {
//   res.send({ firstName: "Prateek", lastName: "Sahu" });
// });

// //*query param
// app.get("/user", (req, res) => {
//   console.log("🚀 ~ app.get ~ req:", req.query);
//   res.send({ firstName: "Prateek", lastName: "Sahu" });
// });
// //* dynamic routing
// app.get("/user/:userId/:name", (req, res) => {
//   console.log("🚀 ~ app.get ~ req:", req.params);
//   res.send({ firstName: "Prateek", lastName: "Sahu" });
// });
//!next route handler we can write array and mix and match also
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling fist response");
//     res.send("1st response");
//     next();
//   },
//   (req, res) => {
//     console.log("second res");
//     res.send("2nd response");
//   }
// );

//!we can do this way also
// app.use("/", (req, res) => {
//   res.send("hhhhhhhhhhhhh");
// });
// app.get("/user", (req, res, next) => {
//   console.log("Handling the routr user");
//   next();
// });
// app.get("/user", (req, res, next) => {
//   console.log("Handling the route");
//   res.send("2nd Route Handler");
// });

//!handle auth MiddleWare For all request
//app.use("/hhhh") here we can check the
//app.all("")
// app.use("/admin", adminAuth);
// // app.use("/user", userAuth);/we can erite like this also
// app.get("/user", userAuth, (req, res) => {
//   res.send("all user are ");
// });
// app.get("/admin/getAllData", (req, res) => {
//   res.send("all data send");
// });
// app.get("/admin/deleteUser", (req, res) => {
//   res.send("delete data ");
// });

//!! Error Handling only this err should be fist parameter
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.get("/getUserData", (req, res) => {
  //If any wrong in this code
  throw new Error("😒😏😏😏");
  res.send("all user are ");
});
//---------------------------------------------------------
app.listen(3000, () => {
  console.log("Server is Started on Port 3000");
});
