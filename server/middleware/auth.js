const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = async (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied.');
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    req.userId = decoded._id;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
