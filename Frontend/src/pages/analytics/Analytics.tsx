import React from 'react';
import { BarChart3, TrendingUp, Users, Map } from 'lucide-react';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { UserGrowthChart } from '../../components/charts/UserGrowthChart';
import { TripStatisticsChart } from '../../components/charts/TripStatisticsChart';

export function Analytics() {
  const stats = [
    { title: 'Total Users', value: 2456, icon: Users, trend: 12 },
    { title: 'Active Trips', value: 124, icon: Map, trend: 8 },
    { title: 'Completed Trips', value: 892, icon: TrendingUp, trend: 15 },
    { title: 'Cancelled Trips', value: 23, icon: BarChart3, trend: -5 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <UserGrowthChart />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Trip Statistics</h2>
          <TripStatisticsChart />
        </div>
      </div>
    </div>
  );
}