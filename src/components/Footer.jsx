// Footer.jsx

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Doflamingo Joyas</h2>
                    <p className="text-gray-400">Tu mejor opción en joyería con los mejores precios y calidad.</p>
                    <p className="text-gray-400 mt-4">© 2024 Doflamingo Joyas. Todos los derechos reservados.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Secciones</h3>
                    <ul>
                        <li><a href="#" className="text-gray-400 hover:text-pink-500">Home</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-pink-500">Personalizados</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-pink-500">Doflamingo</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-pink-500">Contacto</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Mantente Conectado</h3>
                    <form>
                        <label htmlFor="email" className="text-gray-400">Suscríbete a nuestro boletín:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Introduce tu correo"
                            className="mt-2 px-4 py-2 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md w-full">
                            Suscribirse
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto mt-8 text-center text-gray-600 text-sm">
                <p>Este sitio está protegido por reCAPTCHA y la <a href="#" className="text-pink-500 hover:underline">Política de Privacidad</a> y <a href="#" className="text-pink-500 hover:underline">Términos de Servicio</a> de Google se aplican.</p>
            </div>
        </footer>
    );
}
