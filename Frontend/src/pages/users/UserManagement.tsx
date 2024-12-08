import React, { useEffect, useState } from 'react';
import { Table } from '../../components/shared/Table';
import { UserForm } from '../../components/forms/UserForm';
import Modal from '../../components/modals/Modal';
import { User } from '../../types';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'createdAt', header: 'Created At', width: '200px' },
];

export function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useStore();

  useEffect(() => {
    fetchUsers().catch(error => {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    });
  }, [fetchUsers]);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user.id);
        toast.success('User deleted successfully');
      } catch (error) {
        // Error will be handled by the API interceptor
        console.error('Delete failed:', error);
      }
    }
  };

  const handleSubmit = async (data: Partial<User>) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success('User updated successfully');
      } else {
        await addUser(data);
        toast.success('User created successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      // Error will be handled by the API interceptor
      console.error('Operation failed:', error);
    }
  };

  const renderActions = (user: User) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => handleEdit(user)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(user)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={users} actions={renderActions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}