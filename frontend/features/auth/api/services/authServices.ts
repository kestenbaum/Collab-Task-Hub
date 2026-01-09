import { AxiosInstance } from 'axios';
import { api } from '@/shared/api/axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../types';

class AuthServices {
  private axios: AxiosInstance = api;

  public async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.axios.post<AuthResponse>('auth/register', data);
    return response.data;
  }

  public async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.axios.post<AuthResponse>('auth/login', data);
    return response.data;
  }
}

export const authServices = new AuthServices();
