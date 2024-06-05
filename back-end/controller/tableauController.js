
const controller = {}
const models = require('../model/models')

controller.getAll = (req, res) => {

  const userId = req.user_id

  models.Tableau.findAll({ where: { userId } })
    .then(tableaux => {
      res.send(tableaux)
    })
    .catch(err => {
      res.status(500).send("Error")
    })
}

controller.store = (req, res) => {
  const userId = req.user_id
  const { name, icon } = req.body


  models.Tableau.create({ name, icon, userId })
    .then(tableau => res.send(tableau))
    .catch(err => res.status(500))
}

controller.delete = (req, res) => {
  const userId = req.user_id
  const { id } = req.params

  models.Tableau.destroy({ where: { userId, id } })
    .then(() => res.send())
    .catch(err => res.status(500))
}

controller.getById = (req, res) => {
  const userId = req.user_id
  const { id } = req.params

  // With relationship (lists and cards from lists)

  models.Tableau.findOne({ where: { userId, id }, include: { model: models.List, include: models.Card }, order: [[models.List, 'orderBy', 'ASC'], [models.List, models.Card, 'orderBy', 'ASC']] })
    .then(tableau => {
      res.send(tableau)
    })
    .catch(err => {
      res.status(500)
    })
}

module.exports = controller