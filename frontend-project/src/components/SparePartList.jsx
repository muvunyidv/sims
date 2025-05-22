import React from 'react';

const SparePartList = ({ spareParts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-left">Unit Price</th>
            <th className="py-3 px-4 text-left">Total Price</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((sparePart) => (
            <tr key={sparePart.Name} className="border-b">
              <td className="py-3 px-4 text-textPrimary">{sparePart.Name}</td>
              <td className="py-3 px-4 text-textPrimary">{sparePart.Category}</td>
              <td className="py-3 px-4 text-textPrimary">{sparePart.Quantity}</td>
              <td className="py-3 px-4 text-textPrimary">${sparePart.UnitPrice.toFixed(2)}</td>
              <td className="py-3 px-4 text-textPrimary">${sparePart.TotalPrice.toFixed(2)}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => onEdit(sparePart)}
                  className="bg-accent text-white px-3 py-1 rounded-md mr-2 hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(sparePart.Name)}
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

export default SparePartList;