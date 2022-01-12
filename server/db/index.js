//this is the access point for all things database related!

const db = require("./db")
const User = require("./models/User")
const Product = require("./models/Product")
const Animal = require("./models/Animal")

const CartTable = db.define('cartTable', {}, { timestamps: false })
const HistoryTable = db.define('historyTable', {}, { timestamps: false })
const AnimalTable = db.define('animalTable', {}, { timestamps: false })

//associations could go here!

User.belongsToMany(Product, {through: CartTable})
Product.belongsToMany(User, {through: CartTable})

User.belongsToMany(Product, {as: "userIdH", through: HistoryTable})
Product.belongsToMany(User, {as: "productIdH", through: HistoryTable})

Animal.belongsToMany(Product, {as: "animalIdA", through: AnimalTable})
Product.belongsToMany(Animal, {as: "productIdA", through: AnimalTable})

module.exports = {
  db,
  models: {
    User,
    Product,
    Animal,
    CartTable,
    HistoryTable,
    AnimalTable
  },
}
