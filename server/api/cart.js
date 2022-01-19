const router = require("express").Router();
const {
  models: { Cart, CartItem, Product },
} = require("../db");
const { requireToken, isUser } = require("./gateKeepingMiddleware.js");
module.exports = router;
// console.log(Object.keys(sequelizeObject.__proto__));

// /api/cart/:userId | VIEW/ADD/UPDATE CART ITEMS
router.post("/:userId", async (req, res, next) => {
  try {
    let newCart, newItem;
    let localCart = req.body;
    let data = [];

    let dbCart = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        orderComplete: false,
      },
    });
    newCart = dbCart[1];
    dbCart = dbCart[0];
    await dbCart.save();

    // IF TOO MUCH QUANTITY, SEND 400 AND EXIT POST REQUEST
    localCart.forEach(async (product) => {
      try {
        let currentProduct = await Product.findByPk(product.productId);
        if (product.quantity > currentProduct.stock)
          return res.status(400).send({ error: "stock" });
      } catch (err) {
        next(err);
      }
    });
    let localCartArray = localCart.map(obj => obj.productId)
    let productArray = await Product.findAll({attributes: ['id']})
    let productList = productArray.filter(product => !localCartArray.includes(product.id))

    if (productList.length) {
      for (let i = 0; i < productList.length; i++) {
        let currentCartItem = await CartItem.findOne({
          where: {
            cartId: dbCart.id,
            productId: productList[i].id
          },
        })
        if (currentCartItem) await currentCartItem.destroy()
      }
    }

    // UPDATE INFO FOR EACH CART ITEM
    for (const product of localCart) {
      // ============== UPDATING DB ============================
      let currentProduct = await Product.findByPk(product.productId);

      let cartItem = await CartItem.findOrCreate({
        where: {
          productId: product.productId,
          cartId: dbCart.id,
        },
        defaults: {
          priceAtPurchase: currentProduct.price,
          quantity: product.quantity,
        },
      });
      if (!newItem) newItem = cartItem[1];
      let updatedCartItem = await cartItem[0].setCart(dbCart);
      updatedCartItem.quantity = product.quantity;
      await updatedCartItem.save();

      // ============== UPDATING CART/STORE ============================
      const { productId, quantity } = updatedCartItem;
      const { name, description, price, imageUrl } = currentProduct;
      data.push({ productId, name, description, price, quantity, imageUrl });
    }
    if (newCart || newItem) return res.status(201).json(data);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//CHECKOUT
// Get Cart Items
router.get(
  "/:userId/checkout",
  requireToken,
  isUser,
  async (req, res, next) => {
    try {
      let data = [];
      let dbCart = await Cart.findAll({
        where: {
          userId: req.params.userId,
          orderComplete: true,
        },
        include: CartItem,
      });
      dbCart.sort((a, b) => {
        return b.id - a.id;
      });
      if (!dbCart.length) res.send(null)
      for (const cartitem of dbCart[0].cartitems) {
        let product = await Product.findByPk(cartitem.productId);
        const { productId, priceAtPurchase, quantity } = cartitem;
        const { name, imageUrl } = product;
        data.push({
          productId,
          price: priceAtPurchase,
          quantity,
          name,
          imageUrl,
        });
      }
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

// /api/cart/:userId/cart
router.get(
  "/:userId/cart",
  requireToken,
  isUser,
  async (req, res, next) => {
    try {
      let data = [];
      let dbCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          orderComplete: false,
        },
        include: CartItem,
      });
      if (!dbCart) return res.send(null);

      for (const cartitem of dbCart.cartitems) {
        let product = await Product.findByPk(cartitem.productId);

        const { productId, priceAtPurchase, quantity } = cartitem;
        const { name, description, imageUrl } = product;
        data.push({
          productId,
          name,
          description,
          price: priceAtPurchase,
          quantity,
          imageUrl,
        });
      }
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:userId/checkout",
  requireToken,
  isUser,
  async (req, res, next) => {
    try {
      let data = [];
      let dbCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          orderComplete: false,
        },
        include: CartItem,
      });
      if (!dbCart) return res.status(400).send({ error: "no cart" });
      for (const cartitem of dbCart.cartitems) {
        let product = await Product.findByPk(cartitem.productId);
        if (cartitem.quantity > product.stock)
          return res.status(400).send({ error: "stock" });
      }

      for (const cartitem of dbCart.cartitems) {
        let product = await Product.findByPk(cartitem.productId);
        product.stock -= cartitem.quantity;
        await product.save();
        const { productId, quantity } = cartitem;
        const { name, description, price, imageUrl } = product;
        data.push({ productId, name, description, price, quantity, imageUrl });
      }
      dbCart.orderComplete = true;
      await dbCart.save();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:userId", requireToken, isUser, async (req, res, next) => {
  try {
    let currentCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        orderComplete: false,
      },
    });
    let cartItem = await CartItem.findOne({
      where: {
        cartId: currentCart.id,
        productId: req.body.productId,
      },
    });
    await cartItem.destroy();
    res.status(200).send({ productId: req.body.productId });
  } catch (err) {
    next(err);
  }
});
