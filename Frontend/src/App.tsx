import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/users/UserManagement';
import { AdminManagement } from './pages/admins/AdminManagement';
import { TripManagement } from './pages/trips/TripManagement';
import { Analytics } from './pages/analytics/Analytics';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/admins" element={<AdminManagement />} />
              <Route path="/trips" element={<TripManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
