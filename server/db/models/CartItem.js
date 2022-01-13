const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartitem", {
  priceAtPurchase: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = CartItem;
