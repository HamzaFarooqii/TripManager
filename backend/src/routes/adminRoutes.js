const { Router } = require('express');
const { getAdmins, createAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');

const router = Router();

// Get all admins
router.get('/', getAdmins);

// Create a new admin
router.post('/', createAdmin);

// Update admin details by ID
router.put('/:id', updateAdmin);

// Delete an admin by ID
router.delete('/:id', deleteAdmin);

module.exports = router;
