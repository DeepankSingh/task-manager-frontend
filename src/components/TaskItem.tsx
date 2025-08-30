import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { Task } from '../types';

// Props interface for the TaskItem component
interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  isLoading: boolean;
}

// TaskItem Component - Displays individual task with controls
const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask, 
  isLoading 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        
        {/* Completion checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          disabled={isLoading}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed 
              ? 'bg-green-600 border-green-600 text-white' 
              : 'border-gray-300 hover:border-green-500'
          } disabled:opacity-50`}
        >
          {task.completed && <Check size={16} />}
        </button>

        {/* Task title with conditional styling based on completion */}
        <div className="flex-1">
          <h3 className={`text-lg transition-colors ${
            task.completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          
          {/* Status indicator */}
          <p className="text-sm text-gray-500 mt-1">
            Status: {task.completed ? 'Completed' : 'Pending'}
          </p>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDeleteTask(task.id)}
          disabled={isLoading}
          className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;