const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware.js");
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

router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body))
  } catch (err) {
    next(err)
  }
})


router.put("/:productId", requireToken, isAdmin, async (req, res, next) => {
  try {
    let currentProduct = await Product.findByPk(req.params.productId)
    for (let key in req.body) {
      currentProduct[key] = req.body[key]
    }
    currentProduct.save()
    res.status(200).send(currentProduct)
  } catch (err) {
    next(err)
  }
})

router.delete("/:productId", requireToken, isAdmin, async (req, res, next) => {
  try {
    let currentProduct = await Product.findByPk(req.params.productId)
    await currentProduct.destroy()
    res.status(200).send({productId: req.params.productId})
  } catch (err) {
    next(err)
  }
})
