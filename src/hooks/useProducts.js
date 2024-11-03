// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFilter } from './useFilters'; // Importa el hook useFilter para acceder a los filtros

export function useProducts() {
  const { filter } = useFilter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products with filters:', filter); // Debugging
        const response = await axios.get('https://doflax-1266745114d1.herokuapp.com/api/products', {
          params: {
            minPrice: filter.minPrice,
            category: filter.category,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, [filter]); // Dependencia en filter para actualizar los productos cuando cambie el filtro

  return { products };
}
