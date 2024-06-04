const express = require('express');
const router = express.Router();
const controller = require('../controller/tableauController');
const {ensureAuthorized} = require('../lib/auth');

router.post('/tableaux', ensureAuthorized,  controller.store);
router.get('/tableaux', ensureAuthorized, controller.getAll);
router.delete('/tableaux/:id', ensureAuthorized, controller.delete);
router.get('/tableaux/:id', ensureAuthorized, controller.getById);

module.exports = router;
