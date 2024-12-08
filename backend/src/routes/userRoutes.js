const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = Router();

// Get all users
router.get('/', getUsers);

// Create a new user
router.post('/', createUser);

// Update user details by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
