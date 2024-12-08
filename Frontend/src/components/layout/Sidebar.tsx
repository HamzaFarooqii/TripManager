import React from 'react';
import { Users, UserCog, Map, BarChart3, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: <Menu className="w-5 h-5" />, path: '/' },
  { title: 'User Management', icon: <Users className="w-5 h-5" />, path: '/users' },
  { title: 'Admin Management', icon: <UserCog className="w-5 h-5" />, path: '/admins' },
  { title: 'Trip Management', icon: <Map className="w-5 h-5" />, path: '/trips' },
  { title: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, path: '/analytics' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white h-screen">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Menu className="w-6 h-6" />
          <h1 className="text-xl font-bold">Trip Manager</h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}