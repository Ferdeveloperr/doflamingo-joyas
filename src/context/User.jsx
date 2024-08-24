import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al montar el componente, verifica si el usuario ya está logueado
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data); // Guardar los datos del usuario en el estado
        })
        .catch(() => {
          // Manejo de errores (por ejemplo, token expirado)
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
