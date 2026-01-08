import { AxiosInstance } from 'axios';
import { api } from '@/shared/api/axios';

interface UserDto {
  email: string;
  name: string;
}

class AuthServices {
  private axios: AxiosInstance = api;

  public async registerUser(user: UserDto) {
    try {
      const response = await this.axios.post<UserDto>('auth/register', user);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async loginUser(user: UserDto) {
    try {
      const response = await this.axios.post<UserDto>('auth/login', user);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }
}

export const authServices = new AuthServices();
