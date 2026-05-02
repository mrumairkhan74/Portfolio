import axios from 'axios'

const baseURl = import.meta.env.VITE_BACKEND_API

const api = axios.create({
    baseURL: baseURl,
    withCredentials: true, // Important for cookies
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add loading indicators here
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Any successful response handling
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Handle specific error cases
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject({ message: 'Request timeout. Please try again.' });
        }
        
        if (!error.response) {
            console.error('Network error:', error);
            return Promise.reject({ message: 'Network error. Cannot connect to server.' });
        }
        
        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh token
                await api.post('/api/v1/user/refresh-token');
                return api(originalRequest);
            } catch (refreshError) {
                // Redirect to login if refresh fails
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error.response?.data || error);
    }
)

export default api;