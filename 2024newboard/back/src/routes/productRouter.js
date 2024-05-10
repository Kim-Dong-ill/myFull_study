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
  const limit = req.query.limit ? Number(req.query.limit) : 20; //limit이 있으면 사용하고 ?없다면 20사용해라
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id"; //_id로 정렬
  const order = req.query.order ? req.query.order : "desc"; //오름차순
  const search = req.query.searchForm; //검색 받아옴

  //체크박스
  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.query.filters[key][0], //선택한 price의 배열의 1번째보다 gt=grater than
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }
  console.log(search);

  if (search) {
    findArgs["$text"] = { $search: search }; //$search는 몽구스에서 사용하는 단어이다.
  }

  try {
    const products = await Product.find(findArgs)
      .sort([[sortBy, order]]) //대괄호 두개 쓴다
      // .sort({_id:-1})
      .skip(skip)
      .limit(limit); //한번에 가져오는거 제한하기
    const productsTotal = await Product.countDocuments(findArgs); //Products의 총 문서갯수 구하는방법
    const hasMore = skip + limit < productsTotal ? true : false;
    //처음 skip=0 limit=4 ... 더보기 클릭시 skip=4 limit=4가 된다.
    //계속 누르면 skip이 총 데이터수보다 많아지게되는데 그때 false를 리턴한다.
    return res.status(200).send({ products, hasMore });
  } catch (error) {
    console.log(error);
  }
});

module.exports = porductRouter;
