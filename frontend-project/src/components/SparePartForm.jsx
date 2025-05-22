import React, { useState, useEffect } from 'react';

const SparePartForm = ({ sparePart, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    Quantity: 0,
    UnitPrice: 0,
    TotalPrice: 0,
  });

  useEffect(() => {
    if (sparePart) {
      setFormData(sparePart);
    }
  }, [sparePart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'Quantity' || name === 'UnitPrice' || name === 'TotalPrice' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-4">{sparePart ? 'Update Spare Part' : 'Add Spare Part'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-textSecondary mb-1">Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
            disabled={!!sparePart} // Disable Name field when updating
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Category</label>
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Quantity</label>
          <input
            type="number"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-1">Unit Price</label>
          <input
            type="number"
            name="UnitPrice"
            value={formData.UnitPrice}
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
            name="TotalPrice"
            value={formData.TotalPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            step="0.01"
            required
          />
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {sparePart ? 'Update' : 'Add'}
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

export default SparePartForm;