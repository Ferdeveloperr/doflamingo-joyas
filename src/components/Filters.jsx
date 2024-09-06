import { useId } from 'react';
import { useFilter } from '../hooks/useFilters.js';
import './Filters.css';

export function Filters() {
  const { filter, setFilter } = useFilter();
  const minPriceFilterId = useId();

  // Actualiza el filtro de precio
  const handleChangeMinPrice = (event) => {
    const newMinPrice = Number(event.target.value);
    console.log('New Min Price:', newMinPrice); // Debugging
    setFilter((prevState) => ({ ...prevState, minPrice: newMinPrice }));
  };

  // Actualiza el filtro de categoría
  const handleCategoryClick = (category) => {
    setFilter((prevState) => ({ ...prevState, category }));
  };

  // Definir las categorías
  const categories = ['Todas', 'Anillos', 'Pulseras', 'Joyas'];

  return (
    <section className="filters">
      <div className="price-filter">
        <label htmlFor={minPriceFilterId}>Precio:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
          value={filter.minPrice}
          className="price-range"
        />
        <span className="price-value">${filter.minPrice}</span>
      </div>

      <div className="categories">
        <label>Categorías:</label>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${filter.category === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
