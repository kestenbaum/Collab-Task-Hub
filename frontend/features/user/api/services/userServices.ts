import { AxiosInstance } from 'axios';

import { UserDto } from '@/features/auth/types';
import { UpdateUserDto } from '@/features/user/types';
import { api } from '@/shared/api/axios';

class UserServices {
  private axios: AxiosInstance = api;

  public async updateProfile(data: UpdateUserDto): Promise<UserDto> {
    try {
      const response = await this.axios.patch<UserDto>('/users/me', data);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }
}

export const userServices = new UserServices();
