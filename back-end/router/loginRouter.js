const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');


router.post('/authenticate', loginController.authenticate);
router.post('/signin', loginController.signin)


module.exports = router;