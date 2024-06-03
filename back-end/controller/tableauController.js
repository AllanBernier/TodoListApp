
const controller = {}
const Tableaux = require('../model/Tableau')

controller.getAll = (req, res) => {
  const userId = req.user_id

  Tableaux.findAll({ where: { userId } })
    .then(tableaux => res.send(tableaux))
    .catch(err => res.status(500))
}

controller.store = (req, res) => {
  const userId = req.user_id
  const { title, icon } = req.body

  Tableaux.create({ title, icon, userId })
    .then(tableau => res.send(tableau))
    .catch(err => res.status(500))
}

controller.delete = (req, res) => {
  const userId = req.user_id
  const { id } = req.params

  Tableaux.destroy({ where: { userId, id } })
    .then(() => res.send())
    .catch(err => res.status(500))
}


module.exports = controller