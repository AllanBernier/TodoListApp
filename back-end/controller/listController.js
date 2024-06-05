const models = require('../model/models')
const controller = {};


controller.create = async (req, res) => {
  console.log("Hi")
  // Get max order of lists in the tableau
  let maxOrder = await models.List.max('orderBy', { where: { tableauId: req.params.tableauId } });

  models.List.create({ name : req.body.name , userId: req.userId, tableauId: req.params.tableauId, maxOrder: maxOrder ? maxOrder + 1 : 1})
    .then((list) => {
      res.json(list);
    }).catch((err) => {
      res.status(500).json({ message: 'Error creating list!' });
    });
}

controller.delete = async (req, res) => {
  models.List.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ message: 'List deleted!' });
    }).catch((err) => {
      res.status(500).json({ message: 'Error deleting list!' });
    });
}


controller.switchOrder = async (req, res) => {
  // Receive the list id and the new order like req.body = { { id: 1, orderBy: 2 }, { id: 2, orderBy: 1 }, ... } update with one request
  models.List.bulkCreate(req.body, { updateOnDuplicate: ['orderBy'] })
    .then(() => {
      res.json({ message: 'Order updated!' });
    }).catch((err) => {
      res.status(500).json({ message: 'Error updating order!' });
    });
}

module.exports = controller;