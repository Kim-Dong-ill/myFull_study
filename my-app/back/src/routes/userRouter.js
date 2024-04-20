const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

userRouter.get("/", async function (req, res) {
  try {
    const user = await User.find({});
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(400).send(error);
  }
});

userRouter.post("/register", async function (req, res) {
  try {
    const password = await hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: password,
      name: req.body.name,
      role: req.body.role,
    });

    await user.save();
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(400).send(error);
  }
});

userRouter.post("/login", async function (req, res) {
  try {
    console.log("/user/login back 진입");
    //바디에 email, password 실어서 요청했다.
    const user = await User.findOne({ email: req.body.email });
    //user 찾고 토큰 만든다.

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .send({ user, accessToken, message: "로그인 성공!!!" });
  } catch (error) {
    return res.status(400).send({ error: "로그인 실패" });
  }
});

userRouter.post("/auth", auth, async function (req, res) {
  try {
    console.log("/auth back 진입");

    const user = {
      id: req.user._id,
      email: req.user.email,
      password: req.user.password,
      name: req.user.name,
      role: req.user.role,
    };
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = userRouter;
