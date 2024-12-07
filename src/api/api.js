import axios from 'axios';

const Api = axios.create({
    baseURL: '/api', // Vite의 프록시를 사용하도록 변경
    withCredentials: true,
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // localStorage에서 토큰 가져오기

        if (token) {
            // 토큰이 존재하면 Authorization 헤더에 추가
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

export default Api;
