import mongoose from 'mongoose';
import Product from './models/Product.js'; // Asegúrate de que la ruta sea correcta

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/doflamingo_joyas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Conectado a MongoDB');

    // Datos de ejemplo
    const products = [
        { name: 'Anillo de Oro', description: 'Un anillo elegante de oro', price: 500, category: 'Joyas', imageUrl: 'url-de-imagen', stock: 10 },
        { name: 'Collar de Plata', description: 'Un collar brillante de plata', price: 200, category: 'Joyas', imageUrl: 'url-de-imagen', stock: 15 }
    ];

    // Insertar productos en la base de datos
    await Product.insertMany(products);
    console.log('Productos agregados');

    // Desconectar de la base de datos
    mongoose.disconnect();
}).catch(error => {
    console.error('Error:', error);
});
