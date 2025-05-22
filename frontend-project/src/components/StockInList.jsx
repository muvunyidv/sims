import React from 'react';

const StockInList = ({ stockIns, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Spare Part</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockIns.map((stockIn) => (
            <tr key={stockIn.id} className="border-b">
              <td className="py-3 px-4 text-textPrimary">{stockIn.id}</td>
              <td className="py-3 px-4 text-textPrimary">{stockIn.StockInQuantity}</td>
              <td className="py-3 px-4 text-textPrimary">{new Date(stockIn.StockInDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-textPrimary">{stockIn.SparePartName}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => onEdit(stockIn)}
                  className="bg-accent text-white px-3 py-1 rounded-md mr-2 hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(stockIn.id)}
                  className="bg-danger text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockInList;