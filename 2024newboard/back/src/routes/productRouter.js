const express = require("express");
const Product = require("../models/Product");
const porductRouter = express.Router();

porductRouter.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    return res.status(200).send({ product });
  } catch (error) {
    console.log(error);
  }
});

porductRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }); //최근 넣은게 상단에 올라온다
    return res.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
});

module.exports = porductRouter;
