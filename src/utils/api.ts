const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

/**
 * Handles API requests with automatic JSON parsing and error handling
 */
async function fetchWithConfig<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.text();
      return Promise.reject(new Error(error));
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
}

/**
 * API client with methods for standard HTTP operations
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchWithConfig<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body: any, options?: RequestInit) =>
    fetchWithConfig<T>(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  put: <T>(endpoint: string, body: any, options?: RequestInit) =>
    fetchWithConfig<T>(endpoint, { 
      ...options, 
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchWithConfig<T>(endpoint, { ...options, method: 'DELETE' }),
};