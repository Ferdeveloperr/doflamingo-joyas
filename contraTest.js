import bcrypt from 'bcrypt';

// Contraseña en texto claro
const password = 'ferref';

// Contraseña encriptada almacenada en la base de datos (ejemplo)
const hashedPassword = '$2b$10$qN5aDqc5OblnxauYF8NFO.DDuPDpibFDSnS0WANQN5NR7/Lrogmi6'; // Reemplaza con una contraseña encriptada real de tu base de datos



// Comparar contraseñas
bcrypt.compare(password, hashedPassword, (err, isMatch) => {
  if (err) throw err;
  console.log('¿La contraseña coincide?', isMatch); // Debería ser `true`
});
