export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
