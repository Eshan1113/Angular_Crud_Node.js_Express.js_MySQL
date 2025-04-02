const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes'); // ✅ Correct path
const { validationResult } = require('express-validator');

app.use(express.json());
app.use('/items', itemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
module.exports = app;