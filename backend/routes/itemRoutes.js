const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const itemController = require('../controllers/itemController');

// Routes
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.post(
  '/',
  [body('name').notEmpty().trim().escape()], // Validation middleware
  itemController.postItem
);
router.put(
  '/:id',
  [body('name').notEmpty().trim().escape()],
  itemController.updateItem
);
router.delete('/:id', itemController.deleteItem);

module.exports = router;