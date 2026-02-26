import axios from 'axios';

// 1. 기본 설정이 적용된 Axios 인스턴스 생성
export const axiosInstance = axios.create({
    // .env 파일에 VITE_API_BASE_URL이 있으면 그걸 쓰고, 없으면 임시로 localhost:8080을 씁니다.
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    // 5초 동안 서버 응답이 없으면 에러 처리
    timeout: 5000, 
    // 서버로 보내는 데이터는 모두 JSON 형태
    headers: {
        'Content-Type': 'application/json',
    },
});

/* 
    후에 '인터셉터(Interceptor)' 추가
    위에서 만든 storage.getAccessToken()을 통해 
    API 요청마다 자동으로 토큰을 실어 보내는 로직 작성
*/