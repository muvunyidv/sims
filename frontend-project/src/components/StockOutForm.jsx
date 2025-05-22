import React, { useState, useEffect } from 'react';

const StockOutForm = ({ stockOut, spareParts, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    StockOutQuantity: 0,
    StockOutUnitPrice: 0,
    StockOutTotalPrice: 0,
    StockOutDate: '',
    SparePartName: '',
  });

  useEffect(() => {
    if (stockOut) {
      setFormData(stockOut);
    }
  }, [stockOut]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'StockOutQuantity' || name === 'StockOutUnitPrice' || name === 'StockOutTotalPrice'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-4">{stockOut ? 'Update Stock Out' : 'Add Stock Out'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-textSecondary mb-1">Stock Out Quantity</label>
          <input
            type="number"
            name="StockOutQuantity"
            value={formData.StockOutQuantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Unit Price</label>
          <input
            type="number"
            name="StockOutUnitPrice"
            value={formData.StockOutUnitPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Total Price</label>
          <input
            type="number"
            name="StockOutTotalPrice"
            value={formData.StockOutTotalPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Stock Out Date</label>
          <input
            type="date"
            name="StockOutDate"
            value={formData.StockOutDate.split('T')[0]} // Format for date input
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Spare Part</label>
          <select
            name="SparePartName"
            value={formData.SparePartName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Spare Part</option>
            {spareParts.map((sparePart) => (
              <option key={sparePart.Name} value={sparePart.Name}>
                {sparePart.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {stockOut ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StockOutForm;