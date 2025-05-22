const express = require('express');
const router = express.Router();
const db = require('../models'); // Import db from models/index.js
const StockOut = db.StockOut; // Access the StockOut model

// Create a Stock Out entry
router.post('/', async (req, res) => {
  try {
    const { StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate, SparePartName } = req.body;
    const stockOut = await StockOut.create({ StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate, SparePartName });
    res.status(201).json(stockOut);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all Stock Out entries
router.get('/', async (req, res) => {
  try {
    const stockOuts = await StockOut.findAll();
    res.status(200).json(stockOuts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a Stock Out entry by ID
router.get('/:id', async (req, res) => {
  try {
    const stockOut = await StockOut.findByPk(req.params.id);
    if (stockOut) {
      res.status(200).json(stockOut);
    } else {
      res.status(404).json({ error: 'Stock Out entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Stock Out entry
router.put('/:id', async (req, res) => {
  try {
    const stockOut = await StockOut.findByPk(req.params.id);
    if (stockOut) {
      const { StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate, SparePartName } = req.body;
      await stockOut.update({ StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate, SparePartName });
      res.status(200).json(stockOut);
    } else {
      res.status(404).json({ error: 'Stock Out entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Stock Out entry
router.delete('/:id', async (req, res) => {
  try {
    const stockOut = await StockOut.findByPk(req.params.id);
    if (stockOut) {
      await stockOut.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Stock Out entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;