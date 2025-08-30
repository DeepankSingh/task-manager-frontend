import React, { useState } from 'react';
import { Plus } from 'lucide-react';

// Props interface for the TaskForm component
interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
  isLoading: boolean;
}

// TaskForm Component - Handles adding new tasks
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, isLoading }) => {
  // State to manage the task input field
  const [taskTitle, setTaskTitle] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    
    // Check if task title is not empty (after trimming whitespace)
    if (!taskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      // Call the parent component's onAddTask function
      await onAddTask(taskTitle.trim());
      // Clear the input field after successful task creation
      setTaskTitle('');
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      
      {/* Task creation form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter your task..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isLoading} // Disable input while loading
          />
        </div>
        
        {/* Submit button with loading state */}
        <button
          type="submit"
          disabled={isLoading || !taskTitle.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;