const models = require('../model/models')
const controller = {};

controller.create = async (req, res) => {
  let maxOrder = await models.Card.max('orderBy', { where: { listId: req.params.listId } });

  models.Card.create({ name : req.body.name , listId: req.params.listId, orderBy: maxOrder ? maxOrder + 1 : 1})
    .then((list) => {
      res.json(list);
    }).catch((err) => {
      res.status(500).json({ message: 'Error creating card!' });
    });
}

controller.delete = async (req, res) => {
  models.Card.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ message: 'List deleted!' });
    }).catch((err) => {
      res.status(500).json({ message: 'Error deleting card!' });
    });
}

controller.saveCardOrder = async (req, res) => {
  req.body.cards.forEach(async (card, index) => {
    await models.Card.update({ orderBy: index }, { where: { id: card.id } })
  })
  res.json({ message: 'Order updated!'});
}

controller.cardSwapList = async (req, res) => {
  models.Card.update({ listId: req.params.idList }, { where: { id: req.params.idCard } })
    .then(() => {
      res.json({ message: 'Card moved!' });
    }).catch((err) => {
      res.status(500).json({ message: 'Error moving card!' });
    });
}

module.exports = controller;


