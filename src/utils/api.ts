import { API_ENDPOINTS } from '../config/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const apiCall = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Service temporarily unavailable. Please try again later.',
    };
  }
};

export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINTS.SOCKET, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export const showBackendUnavailableMessage = () => {
  return {
    success: false,
    message: 'Backend services are currently unavailable. This is a demo portfolio - the backend API is not deployed.',
  };
}; 