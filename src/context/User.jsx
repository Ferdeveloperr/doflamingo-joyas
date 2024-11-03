import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://doflax-1266745114d1.herokuapp.com/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data); // Asume que response.data es un objeto JSON válido
        })
        .catch(error => {
          console.error('Error al obtener el usuario:', error);
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
