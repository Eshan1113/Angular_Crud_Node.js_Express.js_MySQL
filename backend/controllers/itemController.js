// Import MySQL model functions
const { getAllItems, createItem, getItemById, updateItem, deleteItem } = require('../models/itemModel');

// GET all items
exports.getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new item
exports.postItem = async (req, res) => {
  try {
    const newItem = await createItem(req.body.name);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update item by ID
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await updateItem(req.params.id, req.body.name);
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE item by ID
exports.deleteItem = async (req, res) => {
  try {
    const success = await deleteItem(req.params.id);
    if (!success) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};