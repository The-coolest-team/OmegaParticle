const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  price: Sequelize.FLOAT
})

module.exports = Product
