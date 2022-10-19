const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  token = token.split(" ")[1];
  if (!token) return res.status(400).send("Provide token");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};
