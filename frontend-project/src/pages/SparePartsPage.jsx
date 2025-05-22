import React, { useState, useEffect } from 'react';
import SparePartForm from '../components/SparePartForm';
import SparePartList from '../components/SparePartList';
import Modal from '../components/Modal';
import { getSpareParts, createSparePart, updateSparePart, deleteSparePart } from '../services/sparePartService';

const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [editingSparePart, setEditingSparePart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const fetchSpareParts = async () => {
    try {
      setLoading(true);
      const data = await getSpareParts();
      setSpareParts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch spare parts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (sparePart) => {
    try {
      if (editingSparePart) {
        await updateSparePart(sparePart.Name, sparePart);
      } else {
        await createSparePart(sparePart);
      }
      setEditingSparePart(null);
      setIsModalOpen(false);
      fetchSpareParts();
    } catch (err) {
      setError('Failed to save spare part');
    }
  };

  const handleEdit = (sparePart) => {
    setEditingSparePart(sparePart);
    setIsModalOpen(true);
  };

  const handleDelete = async (name) => {
    try {
      await deleteSparePart(name);
      fetchSpareParts();
    } catch (err) {
      setError('Failed to delete spare part');
    }
  };

  const handleCancel = () => {
    setEditingSparePart(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingSparePart(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-textPrimary">Manage Spare Parts</h1>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Spare Part
        </button>
      </div>

      {error && <p className="text-danger mb-4">{error}</p>}
      {loading ? (
        <p className="text-textPrimary mb-4">Loading spare parts...</p>
      ) : spareParts.length === 0 ? (
        <p className="text-textPrimary mb-4">No spare parts found.</p>
      ) : (
        <SparePartList spareParts={spareParts} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingSparePart ? 'Edit Spare Part' : 'Add Spare Part'}
      >
        <SparePartForm
          sparePart={editingSparePart}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default SparePartsPage;