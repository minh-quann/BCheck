const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bcheck", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
