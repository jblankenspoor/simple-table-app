import { useState } from 'react';
import { TaskForm } from './components/TaskForm';

type Status = 'Done' | 'In progress' | 'To do';
type Priority = 'Low' | 'Medium' | 'High';

interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  startDate: string;
  deadline: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Complete project documentation',
    status: 'In progress',
    priority: 'High',
    startDate: '2025-02-23',
    deadline: '2025-03-01',
  },
  {
    id: 2,
    name: 'Review pull requests',
    status: 'To do',
    priority: 'Medium',
    startDate: '2025-02-24',
    deadline: '2025-02-26',
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [sortField, setSortField] = useState<keyof Task>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Task) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    return aValue < bValue ? -1 * direction : aValue > bValue ? 1 * direction : 0;
  });

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleEditTask = (task: Omit<Task, 'id'>) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...task, id: editingTask.id } : t
        )
      );
      setEditingTask(undefined);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {(showForm || editingTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <TaskForm
              onSubmit={editingTask ? handleEditTask : handleAddTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(undefined);
              }}
              initialTask={editingTask}
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('priority')}
              >
                Priority {sortField === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('startDate')}
              >
                Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('deadline')}
              >
                Deadline {sortField === 'deadline' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer"
                onClick={() => setEditingTask(task)}
              >
                <td className="px-4 py-2">{task.name}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2">{task.priority}</td>
                <td className="px-4 py-2">{task.startDate}</td>
                <td className="px-4 py-2">{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
