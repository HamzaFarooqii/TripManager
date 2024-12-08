import React, { useState } from 'react';
import { Table } from '../../components/shared/Table';
import { TripForm } from '../../components/forms/TripForm';
import Modal from '../../components/modals/Modal';
import { Trip } from '../../types';
import { Edit, Trash2, Map } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const columns = [
  { key: 'title', header: 'Title' },
  { key: 'destination', header: 'Destination' },
  { key: 'startDate', header: 'Start Date' },
  { key: 'endDate', header: 'End Date' },
  { key: 'status', header: 'Status' },
];

export function TripManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { trips, addTrip, updateTrip, deleteTrip } = useStore();

  const handleAdd = () => {
    setSelectedTrip(null);
    setIsModalOpen(true);
  };

  const handleEdit = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleDelete = (trip: Trip) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(trip.id);
      toast.success('Trip deleted successfully');
    }
  };

  const handleSubmit = (data: any) => {
    if (selectedTrip) {
      updateTrip(selectedTrip.id, data);
      toast.success('Trip updated successfully');
    } else {
      addTrip(data);
      toast.success('Trip created successfully');
    }
    setIsModalOpen(false);
  };

  const renderActions = (trip: Trip) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => handleEdit(trip)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(trip)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  const formattedTrips = trips.map(trip => ({
    ...trip,
    startDate: format(new Date(trip.startDate), 'PP'),
    endDate: format(new Date(trip.endDate), 'PP'),
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Trip Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Map className="w-4 h-4" />
          Add Trip
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={formattedTrips} actions={renderActions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTrip ? 'Edit Trip' : 'Add Trip'}
      >
        <TripForm
          trip={selectedTrip}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}