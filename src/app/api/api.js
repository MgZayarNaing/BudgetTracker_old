import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login/`,
    REGISTER: `${API_BASE_URL}/users/create/`,
    REFRESH: `${API_BASE_URL}/token/refresh/`,
    USER_DETAIL: (uuid) => `${API_BASE_URL}/users/${uuid}/`,
    USER_UPDATE: (uuid) => `${API_BASE_URL}/users/${uuid}/update/`,
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(ENDPOINTS.LOGIN, {
            email: email,
            password: password,
        });

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Ensure user data is saved
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Login failed');
        } else {
            throw new Error('Network error or something went wrong');
        }
    }
};

export const register = async (email, username, phone, password, confirmPassword) => {
    try {
        const response = await axios.post(ENDPOINTS.REGISTER, {
            email: email,
            username: username,
            phone: phone,
            password1: password,
            password2: confirmPassword,
        });

        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Registration failed');
        } else {
            throw new Error('Network error or something went wrong');
        }
    }
};

export const getUserDetail = async (uuid) => {
    try {
        const response = await axios.get(ENDPOINTS.USER_DETAIL(uuid));
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Fetching user details failed');
        } else {
            throw new Error('Network error or something went wrong');
        }
    }
};

export const updateUserDetail = async (uuid, userData) => {
    try {
        const response = await axios.put(ENDPOINTS.USER_UPDATE(uuid), userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Updating user details failed');
        } else {
            throw new Error('Network error or something went wrong');
        }
    }
};

// Axios interceptor to handle token expiration
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const response = await axios.post(ENDPOINTS.REFRESH, {
                        refresh: refreshToken,
                    });

                    if (response.status === 200) {
                        localStorage.setItem('access_token', response.data.access);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                        return axios(originalRequest);
                    }
                } catch (error) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);
