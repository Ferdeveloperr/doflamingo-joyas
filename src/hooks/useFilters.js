import { useContext } from "react";
import { FiltersContext } from "../context/Filters";

export function useFilter(){
 

    const {filter, setFilter} = useContext(FiltersContext)
    
  
  
    const filterProducts = (products) => {
      return products.filter(product => {
          return ( 
            product.price >= filter.minPrice && 
            (filter.category === 'Todas' || product.category === filter.category)) 
    })
    }
    return {filterProducts, setFilter, filter }
  }