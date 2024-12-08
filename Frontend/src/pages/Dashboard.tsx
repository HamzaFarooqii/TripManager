import React from 'react';
import { Users, Map, TrendingUp, UserCheck } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';

export function Dashboard() {
  const stats = [
    { title: 'Total Users', value: 2456, icon: Users, trend: 12 },
    { title: 'Active Trips', value: 124, icon: Map, trend: 8 },
    { title: 'Total Revenue', value: 45600, icon: TrendingUp, trend: 15 },
    { title: 'Active Admins', value: 5, icon: UserCheck },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {/* Activity items will go here */}
            <p className="text-gray-600">No recent activities</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage user accounts</p>
            </button>
            <button className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100">
              <Map className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium">Manage Trips</h3>
              <p className="text-sm text-gray-600">View and manage trip details</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}