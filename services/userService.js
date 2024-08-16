import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL de tu backend

// Registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registrando usuario:', error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
};
