import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Application,
  CreateApplicationData,
  UpdateApplicationData,
  AnalyticsSummary
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 400) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', credentials);
    return response.data;
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async (params?: { status?: string; search?: string }): Promise<Application[]> => {
    const response: AxiosResponse<ApiResponse<Application[]>> = await api.get('/applications', { params });
    return response.data.data || [];
  },

  create: async (data: CreateApplicationData): Promise<Application> => {
    const response: AxiosResponse<ApiResponse<Application>> = await api.post('/applications', data);
    return response.data.data!;
  },

  update: async (id: string, data: UpdateApplicationData): Promise<Application> => {
    const response: AxiosResponse<ApiResponse<Application>> = await api.put(`/applications/${id}`, data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },
};

// Analytics API
export const analyticsAPI = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const response: AxiosResponse<ApiResponse<AnalyticsSummary>> = await api.get('/analytics/summary');
    return response.data.data!;
  },
};

export default api;