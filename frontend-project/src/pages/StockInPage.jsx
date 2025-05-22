import React, { useState, useEffect } from 'react';
import StockInForm from '../components/StockInForm';
import StockInList from '../components/StockInList';
import Modal from '../components/Modal';
import { getStockIns, createStockIn, updateStockIn, deleteStockIn } from '../services/stockInService';
import { getSpareParts } from '../services/sparePartService';

const StockInPage = () => {
  const [stockIns, setStockIns] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [editingStockIn, setEditingStockIn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockIns();
    fetchSpareParts();
  }, []);

  const fetchStockIns = async () => {
    try {
      setLoading(true);
      const data = await getStockIns();
      setStockIns(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock ins');
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

  const handleSubmit = async (stockIn) => {
    try {
      if (editingStockIn) {
        await updateStockIn(stockIn.id, stockIn);
      } else {
        await createStockIn(stockIn);
      }
      setEditingStockIn(null);
      setIsModalOpen(false);
      fetchStockIns();
    } catch (err) {
      setError('Failed to save stock in');
    }
  };

  const handleEdit = (stockIn) => {
    setEditingStockIn(stockIn);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStockIn(id);
      fetchStockIns();
    } catch (err) {
      setError('Failed to delete stock in');
    }
  };

  const handleCancel = () => {
    setEditingStockIn(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingStockIn(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-textPrimary">Manage Stock In</h1>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Stock In
        </button>
      </div>

      {error && <p className="text-danger mb-4">{error}</p>}
      {loading ? (
        <p className="text-textPrimary mb-4">Loading stock ins...</p>
      ) : stockIns.length === 0 ? (
        <p className="text-textPrimary mb-4">No stock ins found.</p>
      ) : (
        <StockInList stockIns={stockIns} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingStockIn ? 'Edit Stock In' : 'Add Stock In'}
      >
        <StockInForm
          stockIn={editingStockIn}
          spareParts={spareParts}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default StockInPage;