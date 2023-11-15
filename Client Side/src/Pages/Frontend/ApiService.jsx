import axios from 'axios';

const API_BASE_URL = 'http://localhost:2000';

// Replace with the actual URL of your Node.js API.

export const saveUserData = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/usersData`, userData);
        return response.data; // The saved user data will be returned if the API call is successful.
    } catch (error) {
        console.error('API Error:', error);
        throw error; // You can handle the error further in your React components.
    }
};

export const deleteUserData = async (usersId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteData/${usersId}`,);
        return response.data; // The saved user data will be returned if the API call is successful.
    } catch (error) {
        console.error('API Error delete :', error);
        throw error; // You can handle the error further in your React components.
    }
};
export const updatedUsers = async (userId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${userId}`, updatedData);
        return response.data; // The saved user data will be returned if the API call is successful.
    } catch (error) {
        console.error('API Error delete :', error);
        throw error; // You can handle the error further in your React components.
    }
};

