const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8000";
import axios from 'axios';

const loginUser = async (form) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, form, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

const signupUser = async (form) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, form, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Signup error:', error.response?.data || error.message);
        throw error;
    }
};

const updateUserProfile = async (form) => {
    try {
        const response = await axios.put(`${API_URL}/auth/profile`, form, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Profile update error:', error.response?.data || error.message);
        throw error;
    }
};

export { loginUser, signupUser, updateUserProfile }