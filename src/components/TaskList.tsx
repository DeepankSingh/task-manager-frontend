import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import TaskItem from './TaskItem';

// Props interface for the TaskList component
interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// TaskList Component - Displays all tasks with statistics
const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask, 
  isLoading, 
  error 
}) => {
  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  // Show error state if there's an error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto text-red-600 mb-2" size={24} />
        <p className="text-red-800">Error loading tasks: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      
      {/* Header with task statistics */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
        
        {/* Task statistics */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Circle size={16} />
            <span>{pendingTasks} Pending</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle size={16} />
            <span>{completedTasks} Completed</span>
          </div>
          <div className="text-gray-500">
            Total: {totalTasks}
          </div>
        </div>
      </div>

      {/* Task list or empty state */}
      {tasks.length === 0 ? (
        // Empty state when no tasks exist
        <div className="text-center py-12">
          <Circle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No tasks yet</h3>
          <p className="text-gray-500">Add your first task to get started!</p>
        </div>
      ) : (
        // List of all tasks
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;