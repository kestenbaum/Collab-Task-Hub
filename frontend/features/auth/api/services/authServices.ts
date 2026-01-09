import { AxiosInstance } from 'axios';
import { api } from '@/shared/api/axios';
import { AuthResponseDto, LoginDto, RegisterDto } from '@/features/auth/types';

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
    try {
      const response = await this.axios.post<AuthResponseDto>('/auth/login', data);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }
}

export const authServices = new AuthServices();
