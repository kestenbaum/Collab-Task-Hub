import { AxiosInstance } from 'axios';
import { api } from '@/shared/api/axios';
import { AuthResponse, User, LoginDto } from '@/features/auth/types';


class AuthServices {
  private axios: AxiosInstance = api;

  public async registerUser(data: LoginDto) {
    try {
      const response = await this.axios.post<AuthResponse>('auth/register', data);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async loginUser(data: LoginDto) {
    try {
      const response = await this.axios.post<AuthResponse>('auth/login', data);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async fetchCurrentUser() {
    const response = await this.axios.get<User>('auth/me');
    return response.data;
  }
}

export const authServices = new AuthServices();
