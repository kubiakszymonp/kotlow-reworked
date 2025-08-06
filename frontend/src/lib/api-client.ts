import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { getEnvironmentConfig } from './environments';

// Utility function to build query parameters using qs
const buildQueryParams = (params: Record<string, unknown>): string => {
  return qs.stringify(params, {
    arrayFormat: 'brackets', // formats arrays as param[]=value1&param[]=value2
    skipNulls: true, // skip null values
  });
};

// Generic API client class
class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    const config = getEnvironmentConfig();
    
    this.axiosInstance = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(config.api.apiToken && {
          Authorization: `Bearer ${config.api.apiToken}`,
        }),
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Generic GET method
  async get<T = unknown>(
    endpoint: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const queryString = params ? buildQueryParams(params) : '';
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.axiosInstance.get<T>(url, config);
  }

  // Generic POST method
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(endpoint, data, config);
  }

  // Generic PUT method
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(endpoint, data, config);
  }

  // Generic DELETE method
  async delete<T = unknown>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(endpoint, config);
  }

  // Direct access to axios instance for advanced usage
  get axios(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export utility functions
export { buildQueryParams };
export type { AxiosResponse };