const db = require('../config/db');
const sequelize = require('sequelize');
const models = {}


const List = db.define('list', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  orderBy: { type: sequelize.INTEGER },
  tableauId: { type: sequelize.INTEGER },
});

const Tableau = db.define('tableau', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  userId: { type: sequelize.INTEGER },
  icon: { type: sequelize.STRING },
});

const Card = db.define('card', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  orderBy: { type: sequelize.INTEGER },
  listId: { type: sequelize.INTEGER },
});

models.Tableau = Tableau;
models.List = List;
models.Card = Card;


Tableau.hasMany(List);
List.belongsTo(Tableau);

List.hasMany(Card);
Card.belongsTo(List);


module.exports = models