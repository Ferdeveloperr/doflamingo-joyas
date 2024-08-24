import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al montar el componente, verifica si el usuario ya está logueado
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        if (typeof response.data === 'string') {
          try {
            const jsonData = JSON.parse(response.data);
            setUser(jsonData);
          } catch (e) {
            console.error('Error al convertir la respuesta en JSON:', e);
          }
        } else {
          setUser(response.data);
        }
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
