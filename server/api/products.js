const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock", "imageUrl"],
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    let singleProduct = await Product.findByPk(req.params.productId);
    let { id, name, description, price, stock, imageUrl } = singleProduct;
    singleProduct = { id, name, description, price, stock, imageUrl };
    res.json(singleProduct);
  } catch (err) {
    next(err);
  }
});
