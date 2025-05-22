const express = require('express');
const router = express.Router();
const db = require('../models'); // Import db from models/index.js
const StockIn = db.StockIn; // Access the StockIn model

// Create a Stock In entry
router.post('/', async (req, res) => {
  try {
    const { StockInQuantity, StockInDate, SparePartName } = req.body;
 
    const stockIn = await StockIn.create({ StockInQuantity, StockInDate, SparePartName });
    res.status(201).json(stockIn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all Stock In entries
router.get('/', async (req, res) => {
  try {
    const stockIns = await StockIn.findAll();
    res.status(200).json(stockIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a Stock In entry by ID
router.get('/:id', async (req, res) => {
  try {
    const stockIn = await StockIn.findByPk(req.params.id);
    if (stockIn) {
      res.status(200).json(stockIn);
    } else {
      res.status(404).json({ error: 'Stock In entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Stock In entry
router.put('/:id', async (req, res) => {
  try {
    const stockIn = await StockIn.findByPk(req.params.id);
    if (stockIn) {
      const { StockInQuantity, StockInDate, SparePartName } = req.body;
      await stockIn.update({ StockInQuantity, StockInDate, SparePartName });
      res.status(200).json(stockIn);
    } else {
      res.status(404).json({ error: 'Stock In entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Stock In entry
router.delete('/:id', async (req, res) => {
  try {
    const stockIn = await StockIn.findByPk(req.params.id);
    if (stockIn) {
      await stockIn.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Stock In entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;