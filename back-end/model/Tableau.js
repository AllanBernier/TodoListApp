const db = require('../config/db');
const sequelize = require('sequelize');
const List = require('./List');
// Many to one with list

const tableauSchema = db.define('tableaux', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  userId: { type: sequelize.INTEGER },
  icon: { type: sequelize.STRING },
});

module.exports = tableauSchema 