const db = require('../config/db');
const sequelize = require('sequelize');

const tableauSchema = db.define('tableaux', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: sequelize.STRING },
  userId: { type: sequelize.INTEGER },
  icon: { type: sequelize.STRING },
});

module.exports = tableauSchema 