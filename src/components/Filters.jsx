import { useId } from 'react';
import { useFilter } from '../hooks/useFilters.js';
import './Filters.css';

export function Filters() {
  const { filter, setFilter } = useFilter();
  const minPriceFilterId = useId();

  const handleChangeMinPrice = (event) => {
    setFilter((prevState) => ({ ...prevState, minPrice: event.target.value }));
  };

  const handleCategoryClick = (category) => {
    setFilter((prevState) => ({ ...prevState, category }));
  };

  const categories = ['Todas', 'Anillos', 'Pulseras', 'Collares'];

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
            className={`category-button ${
              filter.category === category ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
