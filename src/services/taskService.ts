import axios from 'axios';
import { Task } from '../types';

// Base URL for all API calls - change this to match your backend
const API_BASE_URL = 'https://task-manager-backend-ftod.onrender.com/api/tasks';

// Configure axios with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout after 10 seconds
  timeout: 10000,
});

// Task Service - Contains all API calls for task management
export const taskService = {
  
  /**
   * Fetch all tasks from the backend
   * GET /api/tasks
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await apiClient.get<Task[]>('');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks. Please check if the backend is running.');
    }
  },

  /**
   * Create a new task
   * POST /api/tasks
   * @param title - The title of the new task
   */
  async createTask(title: string): Promise<Task> {
    try {
      const response = await apiClient.post<Task>('', { title });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task. Please try again.');
    }
  },

  /**
   * Update task completion status
   * PUT /api/tasks/{id}
   * @param id - Task ID
   * @param completed - New completion status
   */
  async updateTaskCompletion(id: number, completed: boolean): Promise<Task> {
    try {
      const response = await apiClient.put<Task>(`/${id}`, { completed });
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task. Please try again.');
    }
  },

  /**
   * Delete a task
   * DELETE /api/tasks/{id}
   * @param id - Task ID to delete
   */
  async deleteTask(id: number): Promise<void> {
    try {
      await apiClient.delete(`/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task. Please try again.');
    }
  },
};