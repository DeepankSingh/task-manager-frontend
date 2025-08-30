// TypeScript interfaces for type safety and better code organization

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
}

// API response type for better error handling
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}