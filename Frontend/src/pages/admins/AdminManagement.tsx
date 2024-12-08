import React, { useState } from 'react';
import { Table } from '../../components/shared/Table';
import { UserForm } from '../../components/forms/UserForm';
import Modal from '../../components/modals/Modal';
import { useStore } from '../../store/useStore';
import { Edit, Trash2, UserCog } from 'lucide-react';
import { Admin } from '../../types';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'createdAt', header: 'Created At', width: '200px' },
];

export function AdminManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const { admins, fetchAdmins, addAdmin, updateAdmin, deleteAdmin } = useStore();

  const handleAdd = () => {
    setSelectedAdmin(null);
    setIsModalOpen(true);
  };

  const handleEdit = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDelete = async (admin: Admin) => {
    try {
      await useStore.getState().deleteAdmin(admin.id);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };
  
  const handleSubmit = async (data: any) => {
    try {
      if (selectedAdmin) {
        await useStore.getState().updateAdmin(selectedAdmin.id, data);
      } else {
        await useStore.getState().addAdmin(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error handling admin:', error);
    }
  };
  

  

  const renderActions = (admin: Admin) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => handleEdit(admin)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(admin)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserCog className="w-4 h-4" />
          Add Admin
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={admins} actions={renderActions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAdmin ? 'Edit Admin' : 'Add Admin'}
      >
        <UserForm
          user={selectedAdmin}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}