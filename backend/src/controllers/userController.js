const { User } = require('../models/User');

// Get all users
// Example in UserController
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Add this line
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, role } = req.body;

  // Validate required fields
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields (name, email, role) are required' });
  }

  try {
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Failed to create user', error });
  }
};


// Update user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};
