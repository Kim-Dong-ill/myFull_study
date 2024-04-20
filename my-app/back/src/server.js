const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/userRouter");
const cors = require("cors");
app.use(cors());

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    //userRouter
    app.use("/user", userRouter);

    app.listen(4000, function () {
      console.log("4000port connected");
    });
  } catch (error) {
    console.log("MongoDB not connected");
  }
};

server();
