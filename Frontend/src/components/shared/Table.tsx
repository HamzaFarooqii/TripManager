import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (item: any) => React.ReactNode;
}

export function Table({ columns, data, actions }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <select className="border-gray-300 rounded-md text-sm">
            <option>10 per page</option>
            <option>25 per page</option>
            <option>50 per page</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm">Page 1 of 1</span>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}