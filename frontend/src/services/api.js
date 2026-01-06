import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

const api = {
    // Get all notes
    getAllNotes: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    },

    // Get single note
    getNote: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching note:', error);
            throw error;
        }
    },

    // Create new note
    createNote: async (noteData) => {
        try {
            const response = await axios.post(API_URL, noteData);
            return response.data;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    },

    // Update note
    updateNote: async (id, noteData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, noteData);
            return response.data;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    },

    // Delete note
    deleteNote: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;
        }
    }
};

export default api;
