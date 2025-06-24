const db = require('../config/database');
const User = require('./user');
const Role = require('./role');
const Job = require('./job');
const Document = require('./document');

const models = { User, Role, Job, Document };

// Gọi associate
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
