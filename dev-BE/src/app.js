const express = require("express");
const app = express();
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
app.get("/user", (req, res) => {
  res.send({ firstName: "Prateek", lastName: "Sahu" });
});
app.post("/user", (req, res) => {
  console.log("Save the data to the data base");
  res.send("Data successfully saved to the database");
});
app.delete("/user", (req, res) => {
  console.log("Delete the data to the data base");
  res.send("Data successfully Deleted from  the database");
});

app.listen(3000, () => {
  console.log("Server is Started on Port 3000");
});
