const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const controller = {};



controller.authenticate = async (req, res) => {

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).json({ message: 'Invalid credentials!' });
        return;
      }
      res.json({ id: user.id, token: user.token });
    }).catch((err) => {
      res.status(401).json({ message: 'Invalid credentials!' });
    });
}

controller.signin = async (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(async (user) => {
      if (user) {
        res.status(409).json({ message: 'User already exists!' });
        return;
      }
  
      const hashed = await bcrypt.hash(req.body.password, 10);

      User.create({ email: req.body.email, password : hashed }).then(async (user) => {
        user.token = jwt.sign(user.id, process.env.JWT_SECRET);
        await user.save();
        res.json({ id: user.id, token: user.token });
      }).catch((err) => {
        res.status(500).json({ message: 'Error creating user!' });
      });
    }).catch((err) => {
      res.status(500).json({ message: 'Error creating user!' });
    });
}


module.exports = controller;