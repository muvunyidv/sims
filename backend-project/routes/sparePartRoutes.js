const express = require('express');
const router = express.Router();
const db = require('../models'); // Import db from models/index.js
const SparePart = db.SparePart; // Access the SparePart model

// Create a Spare Part
router.post('/', async (req, res) => {
  try {
    
    const { Name, Category, Quantity, UnitPrice, TotalPrice } = req.body;

    const existingSparePart = await SparePart.findOne({ where: { Name } });
    if (existingSparePart) {  
      return res.status(400).json({ error: 'Spare Part already exists' });
    }

    const sparePart = await SparePart.create({ Name, Category, Quantity, UnitPrice, TotalPrice });
    res.status(201).json(sparePart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all Spare Parts
router.get('/', async (req, res) => {
  try {
    const spareParts = await SparePart.findAll();
    res.status(200).json(spareParts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a Spare Part by Name
router.get('/:Name', async (req, res) => {
  try {
    const sparePart = await SparePart.findByPk(req.params.Name);
    if (sparePart) {
      res.status(200).json(sparePart);
    } else {
      res.status(404).json({ error: 'Spare Part not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Spare Part
router.put('/:Name', async (req, res) => {
  try {
    const sparePart = await SparePart.findByPk(req.params.Name);
    if (sparePart) {
      const { Category, Quantity, UnitPrice, TotalPrice } = req.body;
      await sparePart.update({ Category, Quantity, UnitPrice, TotalPrice });
      res.status(200).json(sparePart);
    } else {
      res.status(404).json({ error: 'Spare Part not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Spare Part
router.delete('/:Name', async (req, res) => {
  try {
    const sparePart = await SparePart.findByPk(req.params.Name);
    if (sparePart) {
      await sparePart.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Spare Part not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;