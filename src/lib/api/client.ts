import axios from 'axios';
import { setupAuthInterceptor } from './interceptors/auth.interceptor';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

setupAuthInterceptor(apiClient);