const router = require("express").Router();
const { models: { Product } } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try{
    const singleProduct = await Product.findByPk(req.params.productId);
    res.send(singleProduct);
  }catch(err){
    next(err)
  }
})
