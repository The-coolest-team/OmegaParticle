const Sequelize = require("sequelize");
const db = require("../db");

const Animal = db.define("animal", {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Animal;
