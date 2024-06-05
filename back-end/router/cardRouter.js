
const express = require('express');
const router = express.Router();
const cardController = require('../controller/cardController');
const {ensureAuthorized} = require('../lib/auth');

router.post('/card/:listId', ensureAuthorized, cardController.create);
router.delete('/card/:id', ensureAuthorized, cardController.delete);
router.put('/card/order', ensureAuthorized, cardController.saveCardOrder);
router.put('/card/swaplist/:idCard/:idList', ensureAuthorized, cardController.cardSwapList);

module.exports = router;
