import { Filters } from './Filters.jsx'
import './Header.css'

export function Header () {
    return (
        <>

        <nav className="bg-black p-1">
            <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <img src="./public/logo-doflamingo.png" alt="Mi E-commerce" className="h-16 w-16" />
            </div>

                <ul className="flex space-x-4">
                    <li><a href="#" className="styled-text" data-text="Home">Home</a></li>
                    <li><a href="#" className="styled-text" data-text="Productos">Productos</a></li>
                    <li><a href="#" className="styled-text" data-text="Contacto">Contacto</a></li>
                    <li><a href="#" className="styled-text" data-text="Carrito">Carrito</a></li>
                </ul>
            </div>
        </nav>
    
        <header>
            <h1 className='h1'>Doflamingo Joyas</h1>
            <Filters/>
        </header>


</>
    )
}