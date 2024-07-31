import {  useId } from 'react'
import { useFilter } from '../hooks/useFilters.js'
import './Filters.css'


export function Filters () {

    const {filter, setFilter} = useFilter()
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        
        setFilter( prevState => ({...prevState, minPrice: event.target.value}))
    }

    const handleChangeCategory = (event) => {
        setFilter( prevState => ({...prevState, category: event.target.value}))
    }

    return (
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}> Precio a partir de: </label>
                <input type="range"
                id={minPriceFilterId}
                min='0'
                max='1000'
                onChange={handleChangeMinPrice}
                value={filter.minPrice}
                />
                <span>${filter.minPrice}</span>
            </div>    

            <div>
                <label htmlFor={categoryFilterId}> Categoria</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="Rings">Anillos</option>
                    <option value="bracelets">Pulseras</option>
                    <option value="earrings">Collares</option>
                </select>
            </div>
        </section> 
)
}