const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
