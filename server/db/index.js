//this is the access point for all things database related!

const db = require("./db")
const User = require("./models/User")
const Product = require("./models/Product")
const Cart = require("./models/Cart")
const CartItem = require("./models/CartItem")

// ONE TO MANY : USER TO CART
User.hasMany(Cart, {foreignKey: "userId"})
Cart.belongsTo(User)

// ONE TO MANY : CART TO CARTITEM
Cart.hasMany(CartItem, {foreignKey: "cartId"})
CartItem.belongsTo(Cart)

// ONE TO MANY : PRODUCT TO CARTITEM
Product.hasMany(CartItem, {foreignKey: "productId"})
CartItem.belongsTo(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem
  },
}
