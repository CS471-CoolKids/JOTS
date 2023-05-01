const express = require('express');
const router = express.Router();

const controller = require('../controllers/item.controller.js');

router.post('/items', controller.create);
router.get('/items', controller.findAll);
router.get('/items/:id', controller.findOne);
router.put('/items/:id', controller.update);
router.delete('/items/:id', controller.delete);

module.exports = router;
