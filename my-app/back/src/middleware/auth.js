const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  console.log("미들웨어 auth 진입");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).send("token 없음");
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decode.userId });
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
