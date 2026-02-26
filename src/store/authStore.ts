import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  // 추후 로그인 API 연동 시 확장 예정 (user 정보, setTokens 등)
}

export const useAuthStore = create<AuthState>(() => ({
  isLoggedIn: false,
}));
