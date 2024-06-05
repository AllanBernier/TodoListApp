const models = require('../model/models')
const controller = {};

controller.create = async (req, res) => {
  // Get max order of card in the tableau
  let maxOrder = await models.Card.max('orderBy', { where: { listId: req.params.listId } });

  console.log(req.body.name, req.userId, req.params.listId, maxOrder ? maxOrder + 1 : 1)

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
  // Receive a list of cards and store index with orderBy like req.body = { { id: 15, orderBy: 2 }, { id: 65, orderBy: 1 }, ... } update with { {id : 15, orderBy: 1}, {id :65, orderBy: 2} } }
  req.body.cards.forEach(async (card, index) => {
    console.log(card.name, index)
    await models.Card.update({ orderBy: index }, { where: { id: card.id } })
    
  })
  res.json({ message: 'Order updated!'});
}

controller.cardSwapList = async (req, res) => {
  console.log("Hi biatch")
  models.Card.update({ listId: req.params.idList }, { where: { id: req.params.idCard } })
    .then(() => {
      res.json({ message: 'Card moved!' });
    }).catch((err) => {
      res.status(500).json({ message: 'Error moving card!' });
    });
}

module.exports = controller;


