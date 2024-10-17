var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// Crear un usuario
router.post('/', userController.createUser);

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Actualizar un usuario por ID
router.put('/:id', userController.updateUserById);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;