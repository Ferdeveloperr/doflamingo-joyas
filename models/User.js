import mongoose from 'mongoose'; // Usamos import en lugar de require
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: { // Token para la recuperación de contraseña
    type: String,
    default: null,
  },
  resetPasswordExpires: { // Fecha de expiración del token
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Genera un salt
    const hashedPassword = await bcrypt.hash(this.password, salt); // Encripta la contraseña
    this.password = hashedPassword; // Asigna la contraseña encriptada
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; // Exportamos usando export default
