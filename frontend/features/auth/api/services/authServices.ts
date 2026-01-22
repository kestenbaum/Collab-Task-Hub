import { AxiosInstance } from 'axios';

import { AuthResponseDto, LoginDto, RegisterDto } from '@/features/auth/types';
import { api } from '@/shared/api/axios';

class AuthServices {
  private axios: AxiosInstance = api;

  public async registerUser(data: RegisterDto): Promise<AuthResponseDto> {
    try {
      const response = await this.axios.post<AuthResponseDto>('/auth/register', data);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async loginUser(data: LoginDto): Promise<AuthResponseDto> {
    const response = await this.axios.post<AuthResponseDto>('/auth/login', data);
    return response.data;
  }

  public async getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token');

    const { data } = await this.axios.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export const authServices = new AuthServices();
