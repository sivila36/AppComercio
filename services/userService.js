const User = require('../models/User');

// Crear un usuario
exports.createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

// Obtener todos los usuarios
exports.getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// Obtener un usuario por ID
exports.getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

// Actualizar un usuario por ID
exports.updateUserById = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
  return user;
};

// Eliminar un usuario por ID
exports.deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
