import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
});

// === Request Interceptor: Gửi accessToken ===
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// === Response Interceptor: Tự động refresh token nếu 401 ===
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(
                    'http://localhost:8080/users/auth/refresh',
                    { refreshToken },
                    { withCredentials: true },
                );

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return instance(originalRequest); // ✅ Retry với token mới
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default instance;
