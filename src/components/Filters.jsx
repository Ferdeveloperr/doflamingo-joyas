import { useFilter } from '../hooks/useFilters'
import './Filters.css'
import { useState, useId } from 'react'

export function Filters () {
    const {setFilter} = useFilter()
    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value)
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
                />
                <span>${minPrice}</span>
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