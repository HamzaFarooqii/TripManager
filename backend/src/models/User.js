const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }
}, { 
  timestamps: true,  // Adds createdAt and updatedAt
  unique: true       // Helps handle duplicate key errors
});

const User = mongoose.model('User', userSchema);

module.exports = { User };