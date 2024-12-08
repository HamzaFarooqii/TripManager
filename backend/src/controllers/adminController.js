const { Admin } = require('../models/Admin');

// Get all admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get admins', error: error.message });
  }
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const newAdmin = new Admin({ name, email, role });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create admin', error: error.message });
  }
};
// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete admin' });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const admin = await Admin.findByIdAndUpdate(
      id, 
      updates,
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update admin' });
  }
};
