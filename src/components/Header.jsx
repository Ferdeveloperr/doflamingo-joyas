import { Filters } from './Filters.jsx'
import './Header.css'

export function Header () {
    return (
        <>

    <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Mi E-commerce</div>
        <ul className="flex space-x-4">
            <li><a href="#" className="text-white hover:text-gray-200">Home</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Productos</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Carrito</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Contacto</a></li>
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