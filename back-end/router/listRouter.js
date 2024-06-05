const express = require('express');
const router = express.Router();
const listController = require('../controller/listController');
const {ensureAuthorized} = require('../lib/auth');

router.post('/list/:tableauId', ensureAuthorized, listController.create);
router.delete('/list/:id', ensureAuthorized, listController.delete);
router.put('/list/switchOrder', ensureAuthorized, listController.switchOrder);


module.exports = router;