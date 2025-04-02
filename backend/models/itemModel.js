const pool = require('../config/db'); // Create this file (see below)

const getAllItems = async () => {
  const [rows] = await pool.query('SELECT * FROM items');
  return rows;
};

const createItem = async (name) => {
  const [result] = await pool.query('INSERT INTO items (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
};

module.exports = { getAllItems, createItem };