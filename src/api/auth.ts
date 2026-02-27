import { axiosInstance } from './axios';

// 백엔드로 보낼 데이터 타입
export interface LoginRequest {
    email: string;
    password: string;
}

// 백엔드에서 받을 데이터 타입 (토큰)
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    // user 정보 등 추가
}

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/accounts/login/', data);
    return response.data;
};