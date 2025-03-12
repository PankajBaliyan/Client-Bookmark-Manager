const API_URL = import.meta.env.VITE_APP_API_URL;
import axios from 'axios';

const loginUser = async (form) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, form, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error; // Re-throw for handling in the calling function
    }
};

const signupUser = async (form) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, form, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Signup error:', error.response?.data || error.message);
        throw error; // Re-throw for handling in the calling function
    }
};

export { loginUser, signupUser }