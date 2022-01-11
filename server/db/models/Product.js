const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  },
  image_url: {
    type: Sequelize.STRING,
    defaultValue: "https://m.media-amazon.com/images/I/71cnPzmu7WL._AC_SL1500_.jpg",
  },
});

module.exports = Product;
