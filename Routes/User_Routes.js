const express = require('express');

const router = express.Router();

const User = require('../Models/New_User_Model')

const {getAllUsers, getUserById, createUser, deleteUser, updateUser} = require('../Controllers/Route_methods');

// Finished GET for all users.
router.get('/', getAllUsers );

// Finished GET for one user.
router.get('/:id', getUserById );

// Finished POST request.
router.post('/', createUser );

// Finished DELETE request.
router.delete('/:id', deleteUser );

// Finished PATCH request.
router.patch('/:id', updateUser );

module.exports = router;