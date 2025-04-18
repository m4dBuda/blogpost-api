export interface ApiResponse<T = any> {
  operation: 'success' | 'error';
  message: string | string[];
  timestamp: string;
  path?: string;
  data?: T;
}

export function createSuccessResponse<T>(data: T, message = 'Request successful'): ApiResponse<T> {
  return {
    operation: 'success',
    message,
    timestamp: new Date().toISOString(),
    data,
  };
}

export function createErrorResponse(message: string | string[], path?: string, data?: any): ApiResponse {
  return {
    operation: 'error',
    message,
    timestamp: new Date().toISOString(),
    path,
    data: data && typeof data === 'object' ? { ...data, message: undefined } : data,
  };
}
