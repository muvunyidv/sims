import React, { useState, useEffect } from 'react';

const StockInForm = ({ stockIn, spareParts, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    StockInQuantity: 0,
    StockInDate: '',
    SparePartName: '',
  });

  useEffect(() => {
    if (stockIn) {
      setFormData(stockIn);
    }
  }, [stockIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'StockInQuantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-4">{stockIn ? 'Update Stock In' : 'Add Stock In'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-textSecondary mb-1">Stock In Quantity</label>
          <input
            type="number"
            name="StockInQuantity"
            value={formData.StockInQuantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Stock In Date</label>
          <input
            type="date"
            name="StockInDate"
            value={formData.StockInDate.split('T')[0]} // Format for date input
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
          {stockIn ? 'Update' : 'Add'}
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

export default StockInForm;