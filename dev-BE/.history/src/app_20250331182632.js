const express = require("express");
const app = express();
// app.use((req, res) => {
//res.send("Hello From the server");
// });

//we can gave route also
app.use("/test", (req, res) => {
  res.send("Hello From the server");
});
app.use("/user", (req, res) => {
  res.send("Hii this is prateek🙋");
});
app.listen(3000, () => {
  console.log("Server is Started on Port 3000");
});
