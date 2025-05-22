const express = require('express');
const router = express.Router();
const { SparePart, StockIn, StockOut } = require('../models');

// GET /api/reports - Fetch a report of all Spare Parts with their Stock In and Stock Out entries
router.get('/', async (req, res) => {
  try {
    // Fetch all Spare Parts, including associated Stock In and Stock Out entries
    const spareParts = await SparePart.findAll({
      include: [
        {
          model: StockIn,
          as: 'StockIns', // Alias defined in the model associations
          attributes: ['id', 'StockInQuantity', 'StockInDate'],
        },
        {
          model: StockOut,
          as: 'StockOuts', // Alias defined in the model associations
          attributes: ['id', 'StockOutQuantity', 'StockOutUnitPrice', 'StockOutTotalPrice', 'StockOutDate'],
        },
      ],
    });

    // Transform the data into a report-friendly structure
    const report = spareParts.map((sparePart) => ({
      Name: sparePart.Name,
      Category: sparePart.Category,
      Quantity: sparePart.Quantity,
      UnitPrice: sparePart.UnitPrice,
      TotalPrice: sparePart.TotalPrice,
      StockIns: sparePart.StockIns || [], // Ensure empty array if no Stock In entries
      StockOuts: sparePart.StockOuts || [], // Ensure empty array if no Stock Out entries
    }));

    res.json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;