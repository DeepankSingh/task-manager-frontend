import React, { useState, useEffect } from 'react';
import { CheckSquare, Loader } from 'lucide-react';
import { Task } from './types';
import { taskService } from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// Main App Component - Task Manager
function App() {
  // State Management
  const [tasks, setTasks] = useState<Task[]>([]); // Array to store all tasks
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState<string | null>(null); // Error state for error handling
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Initial page load state

  /**
   * Fetch all tasks from the backend
   * Called on component mount and after successful operations
   */
  const fetchTasks = async () => {
    try {
      setError(null); // Clear any previous errors
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks); // Update tasks state with fetched data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsInitialLoading(false); // Mark initial loading as complete
    }
  };

  /**
   * Add a new task
   * @param title - Title of the new task
   */
  const handleAddTask = async (title: string) => {
    setIsLoading(true); // Show loading state
    try {
      const newTask = await taskService.createTask(title);
      // Add new task to the beginning of the tasks array (most recent first)
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
      throw err; // Re-throw to handle in component if needed
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  /**
   * Toggle task completion status
   * @param id - ID of the task to toggle
   */
  const handleToggleComplete = async (id: number) => {
    // Find the task to get current completion status
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    setIsLoading(true);
    try {
      // Call API to update completion status
      const updatedTask = await taskService.updateTaskCompletion(
        id, 
        !taskToUpdate.completed // Toggle the completion status
      );
      
      // Update the task in the local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? updatedTask : task
        )
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a task
   * @param id - ID of the task to delete
   */
  const handleDeleteTask = async (id: number) => {
    // Confirm deletion with user
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsLoading(true);
    try {
      await taskService.deleteTask(id);
      // Remove task from local state
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // Show loading spinner during initial load
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-blue-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600">Organize your tasks efficiently</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Task Creation Form */}
        <TaskForm 
          onAddTask={handleAddTask} 
          isLoading={isLoading} 
        />
        
        {/* Task List Display */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          isLoading={isLoading}
          error={error}
        />
        
        {/* Footer with helpful information */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Organize tasks with ease – add, complete, delete. 
            <code className="bg-gray-200 px-2 py-1 rounded ml-1">
              A simple task manager to keep you on track.
            </code>
          </p>
          <p className="mt-2">
            Plan smarter with quick task add, complete & delete.
          </p>
        </footer>
        
      </main>
    </div>
  );
}

export default App;