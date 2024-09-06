import { useState, useEffect, useContext } from "react";
import { FiltersContext } from "../context/Filters";

export function useFilter() {
    const { filter, setFilter } = useContext(FiltersContext);
    const [products, setProducts] = useState([]);

    // Obtener productos del backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products'); // URL del backend
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    const filterProducts = () => {
        return products.filter(product => {
            return (
                product.price >= filter.minPrice &&
                (filter.category === 'Todas' || product.category === filter.category)
            );
        });
    };

    return { filterProducts, setFilter, filter };
}
