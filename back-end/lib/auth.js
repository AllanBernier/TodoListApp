const jwt = require('jsonwebtoken');
const User = require('../model/User');

const getAuthUser = async (req, res, next) => {
  let bearerToken;
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;

    const user = await User.findOne({ where: { token: req.token } });
    
    if (user) {
      req.user = user;
      next();
      return;
    }
  }    
  console.log("hi")
  res.send(403);
}

const ensureAuthorized = (req, res, next) => {
  let bearerToken;
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    req.user_id = jwt.verify(req.token, process.env.JWT_SECRET);

    next();
    return
  }
  res.send(403);
}

module.exports = { ensureAuthorized, getAuthUser }