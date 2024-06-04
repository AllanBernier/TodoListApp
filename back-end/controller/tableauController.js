
const controller = {}
const Tableaux = require('../model/Tableau')

controller.getAll = (req, res) => {

  const userId = req.user_id

  Tableaux.findAll({ where: { userId } })
    .then(tableaux => {
      console.log("tableaux")  
      res.send(tableaux)
    })
    .catch(err => {
        res.status(500).send("Error")
      })
    .finally(() => console.log("finally"))
}

controller.store = (req, res) => {
  const userId = req.user_id
  const { name, icon } = req.body

  console.log("store", userId, name, icon)

  Tableaux.create({ name, icon, userId })
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

controller.getById = (req, res) => {
  const userId = req.user_id
  const { id } = req.params

  // With all relationship (include: 'cards')
  Tableaux.findOne({ where: { userId, id }  })
    .then(tableau => res.send(tableau))
    .catch(err => res.status(500))

}

module.exports = controller