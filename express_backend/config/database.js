const Sequelize = require('sequelize');


module.exports = new Sequelize('railway', 'root', 'jMcZKueHRyjyAlUHwZWHPOGdLNvPjGLi', {
  host: 'switchback.proxy.rlwy.net',
  dialect: 'mysql',
  port: 28387,
  logging: false,
});
