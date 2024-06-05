const db = require('../config/db');
const sequelize = require('sequelize');

const listSchema = db.define('lists', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  orderBy: { type: sequelize.INTEGER },
  tableauId: { type: sequelize.INTEGER },
});

module.exports = listSchema