import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { getClientConfig, getServerConfig } from './environments';

// Utility function to build query parameters using qs
const buildQueryParams = (params: Record<string, unknown>): string => {
  return qs.stringify(params, {
    arrayFormat: 'brackets', // formats arrays as param[]=value1&param[]=value2
    skipNulls: true, // skip null values
  });
};

// Base API client class
abstract class BaseApiClient {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string, timeout: number, additionalHeaders: Record<string, string> = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        }
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
        // eslint-disable-next-line no-console
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

// Server-side API client - communicates directly with Strapi
class ServerApiClient extends BaseApiClient {
  constructor() {
    const config = getServerConfig();
    const headers: Record<string, string> = {};
    
    // Add API token for server-side requests
    if (config.apiToken) {
      headers['Authorization'] = `Bearer ${config.apiToken}`;
    }
    
    super(config.baseUrl, config.timeout, headers);
  }
}

// Client-side API client - uses Next.js API proxy
class ClientApiClient extends BaseApiClient {
  constructor() {
    const config = getClientConfig();
    // Client-side uses the proxy route, no direct auth needed
    super(config.baseUrl, config.timeout);
  }
}

// Factory function to get the appropriate client based on environment
function createApiClient(): BaseApiClient {
  // Check if we're on the server side
  if (typeof window === 'undefined') {
    return new ServerApiClient();
  }
  return new ClientApiClient();
}

// Export singleton instances
export const apiClient = createApiClient();
export const serverApiClient = new ServerApiClient();
export const clientApiClient = new ClientApiClient();

// Export utility functions
export { buildQueryParams };
export type { AxiosResponse };