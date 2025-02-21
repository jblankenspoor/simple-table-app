import React from 'react';
import { TableRow } from './types';
import { format } from 'date-fns';

const data: TableRow[] = [
  {
    id: 1,
    name: 'Quarterly launch',
    status: 'Done',
    priority: 'Low',
    startDate: '2025-02-17',
    deadline: '2025-02-20',
  },
  {
    id: 2,
    name: 'Customer research',
    status: 'In progress',
    priority: 'Medium',
    startDate: '2025-02-21',
    deadline: '2025-02-24',
  },
  {
    id: 3,
    name: 'Campaign analysis',
    status: 'To do',
    priority: 'High',
    startDate: '2025-02-25',
    deadline: '2025-02-28',
  },
];

function App() {
  const getStatusColor = (status: TableRow['status']) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In progress': return 'bg-yellow-100 text-yellow-800';
      case 'To do': return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: TableRow['priority']) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(row.priority)}`}>
                    {row.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(row.startDate), 'dd MMM yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(row.deadline), 'dd MMM yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
