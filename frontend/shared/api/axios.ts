import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token: string | null = localStorage.getItem('access_token');

            if (token) {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: unknown): Promise<never> => Promise.reject(error)
);
