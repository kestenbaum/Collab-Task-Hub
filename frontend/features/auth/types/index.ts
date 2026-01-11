export interface UserDto {
  id: string;
  email: string;
  name: string;
}

export interface RegisterDto {
  email: string;
  name: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  access_token: string;
  user: UserDto;
}

export interface AuthState {
  user: UserDto | null;
  isAuth: boolean;
  isLoading: boolean;
  loginUser: (data: LoginDto) => Promise<void>;
  registerUser: (data: RegisterDto) => Promise<void>;
  logoutUser: () => void;
}
