const router = require("express").Router();
const { models: { Cart, CartItem, Product } } = require("../db");
module.exports = router;
// console.log(Object.keys(sequelizeObject.__proto__));

// VIEW YOUR CART
router.get('/:userId', async (req, res, next) => {
  try {
    const currentCart = await Cart.findOne({where: {userId: req.params.userId, orderComplete: false}, include: CartItem})
    res.send(currentCart.cartitems)
  } catch (err) {
    next(err)
  }
})

// ADD AN ITEM TO THE CART
router.post("/:userId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.productId)
    if (req.body.quantity > product.stock) res.status(400).send({error: true})

    let currentCart = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        orderComplete: false
      }
    })
    console.log("currentCart was created is", currentCart[1])
    const newCart = currentCart[1]
    currentCart = currentCart[0]
    await currentCart.save()
    console.log(currentCart)

    const cartItem = await CartItem.findOrCreate({
      where: {
        productId: req.body.productId,
      },
      defaults: {
        priceAtPurchase: product.price,
        quantity: req.body.quantity
      }
    });
    const updatedCartItem = await cartItem[0].setCart(currentCart)

    if (newCart) {
      updatedCartItem.quantity = req.body.quantity
      await updatedCartItem.save()
      res.status(201).send(updatedCartItem)
    }
    else {
      let currentPrice = updatedCartItem.priceAtPurchase
      let newPrice = product.price
      if (currentPrice !== newPrice) currentPrice = newPrice
      cartItem[0].quantity += req.body.quantity
      await updatedCartItem.save()
      if (newCart) res.status(201).send(updatedCartItem)
      res.status(200).send(updatedCartItem);
    }
  } catch (error) {
    next(error)
  }
});

// MODIFY AN ITEM IN YOUR CART
router.put('/:userId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.productId)
    if (req.body.quantity > product.stock) res.status(400).send({error: true})

    let currentCart = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        orderComplete: false
      }
    })
    console.log("currentCart was created is", currentCart[1])
    newCart = currentCart[1]
    currentCart = currentCart[0]
    await currentCart.save()
    console.log(currentCart)

    const cartItem = await CartItem.findOrCreate({
      where: {
        productId: req.body.productId,
      },
      defaults: {
        priceAtPurchase: product.price,
        quantity: req.body.quantity
      }
    });
    const newCartItem = cartItem[1]
    const updatedCartItem = await cartItem[0].setCart(currentCart)

    updatedCartItem.quantity = req.body.quantity

    await updatedCartItem.save()

    if (newCart || newCartItem) res.status(201).send(updatedCartItem)
    res.status(200).send(updatedCartItem)
  } catch (err) {
    next(err)
  }
})

//CHECKOUT
router.put('/:userId/checkout', async (req, res, next) => {
  try {
    let currentCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        orderComplete: false
      },
      include: CartItem
    })

    // INSERT PAYMENT PROCESSING HERE //////

    ////////////////////////////////////////

    currentCart.cartitems.forEach(async (cartitem) => {
      const product = await Product.findByPk(cartitem.id)
      if (cartitem.quantity > product.stock) res.status(400).send({error: true})

      product.quantity -= cartitem.quantity
      await product.save()
    })
    currentCart.orderComplete = true
    await currentCart.save()
    res.status(200).send(currentCart)
  } catch (err) {
    next(err)
  }
})
