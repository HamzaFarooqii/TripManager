const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }
}, { 
  timestamps: true,  // Adds createdAt and updatedAt
  unique: true       // Helps handle duplicate key errors
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin };