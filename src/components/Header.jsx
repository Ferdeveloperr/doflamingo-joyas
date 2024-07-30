import { Filters } from './Filters.jsx'
import './Header.css'

export function Header () {
    return (
        <header>
            <h1 className='h1'>Doflamingo Joyas</h1>
            <Filters/>
        </header>
    )
}