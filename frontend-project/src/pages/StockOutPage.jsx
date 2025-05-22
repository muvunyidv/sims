import React, { useState, useEffect } from 'react';
import StockOutForm from '../components/StockOutForm';
import StockOutList from '../components/StockOutList';
import Modal from '../components/Modal';
import { getStockOuts, createStockOut, updateStockOut, deleteStockOut } from '../services/stockOutService';
import { getSpareParts } from '../services/sparePartService';

const StockOutPage = () => {
  const [stockOuts, setStockOuts] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [editingStockOut, setEditingStockOut] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockOuts();
    fetchSpareParts();
  }, []);

  const fetchStockOuts = async () => {
    try {
      setLoading(true);
      const data = await getStockOuts();
      setStockOuts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock outs');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpareParts = async () => {
    try {
      const data = await getSpareParts();
      setSpareParts(data);
    } catch (err) {
      setError('Failed to fetch spare parts');
    }
  };

  const handleSubmit = async (stockOut) => {
    try {
      if (editingStockOut) {
        await updateStockOut(stockOut.id, stockOut);
      } else {
        await createStockOut(stockOut);
      }
      setEditingStockOut(null);
      setIsModalOpen(false);
      fetchStockOuts();
    } catch (err) {
      setError('Failed to save stock out');
    }
  };

  const handleEdit = (stockOut) => {
    setEditingStockOut(stockOut);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStockOut(id);
      fetchStockOuts();
    } catch (err) {
      setError('Failed to delete stock out');
    }
  };

  const handleCancel = () => {
    setEditingStockOut(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingStockOut(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-textPrimary">Manage Stock Out</h1>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Stock Out
        </button>
      </div>

      {error && <p className="text-danger mb-4">{error}</p>}
      {loading ? (
        <p className="text-textPrimary mb-4">Loading stock outs...</p>
      ) : stockOuts.length === 0 ? (
        <p className="text-textPrimary mb-4">No stock outs found.</p>
      ) : (
        <StockOutList stockOuts={stockOuts} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingStockOut ? 'Edit Stock Out' : 'Add Stock Out'}
      >
        <StockOutForm
          stockOut={editingStockOut}
          spareParts={spareParts}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default StockOutPage;