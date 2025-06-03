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
    (error) => Promise.reject(error)
);

// === Response Interceptor: Tự động refresh token nếu 401 ===
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    'http://localhost:8080/users/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Gắn accessToken mới vào header rồi gửi lại request
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                localStorage.removeItem('accessToken');
                window.location.href = '/login'; // hoặc điều hướng tuỳ app của bạn
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
