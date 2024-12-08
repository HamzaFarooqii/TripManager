const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'Planned' }
}, { 
  timestamps: true,  // Adds createdAt and updatedAt
  unique: true       // Helps handle duplicate key errors
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = { Trip };