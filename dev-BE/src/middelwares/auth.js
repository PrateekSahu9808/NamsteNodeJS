const adminAuth = (req, res, next) => {
  const token = "qqq";
  const isAdminAuth = token === "qqq";
  if (!isAdminAuth) {
    res.status(401).send("unautorized");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const token = "qqq";
  const isAdminAuth = token === "qqq";
  if (!isAdminAuth) {
    res.status(401).send("unautorized");
  } else {
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
