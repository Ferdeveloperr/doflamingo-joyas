import { Filters } from './Filters.jsx'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../assets/icons.js'

export function Header () {
    return (
        <>

        <nav className="bg-black">
            <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <img src="./public/logo-doflamingo.png" alt="Mi E-commerce" className="h-16 w-auto" />
            </div>

            <div className="ml-4">
                    <form className="relative">
                        <input 
                            type="text" 
                            placeholder="Escriba para buscar aqui" 
                            className="bg-white-800 text-black rounded-full pl-4 pr-10 py-0.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-0 top-0 mt-1 mr-2 text-gray-500 hover:text-black"
                        >
                           <FontAwesomeIcon icon="search" />
                        </button>
                    </form>
                </div>

                <ul className="flex space-x-4 pr-4">
                    <li><a href="#" className="styled-text" data-text="Home">Home</a></li>
                    <li><a href="#" className="styled-text" data-text="Personalizados">Personalizados</a></li>
                    <li><a href="#" className="styled-text" data-text="Doflamingo">Doflamingo </a></li>
                    <li><a href="#" className="styled-text" data-text="Contacto">Contacto</a></li>
                    <li>
                            <a href="#" className="text-white">
                                <FontAwesomeIcon icon="user" />
                            </a>
                        </li>
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