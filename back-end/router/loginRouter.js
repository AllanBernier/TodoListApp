const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');


router.post('/authenticate', loginController.authenticate);
router.post('/signup', loginController.signup)


module.exports = router;