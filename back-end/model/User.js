const db = require('../config/db');
const sequelize = require('sequelize');

const userSchema = db.define('user', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: sequelize.STRING },
  password: { type: sequelize.STRING },
  token: { type: sequelize.STRING, allowNull: true},
});

module.exports = userSchema