const { Trip } = require('../models/Trip');

// Get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get trips', error });
  }
};

// Create a new trip
exports.createTrip = async (req, res) => {
  const { title, destination, startDate, endDate, status } = req.body;
  try {
    const newTrip = new Trip({ title, destination, startDate, endDate, status });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create trip', error });
  }
};

// Update trip by ID
exports.updateTrip = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trip', error });
  }
};

// Delete trip by ID
exports.deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrip = await Trip.findByIdAndDelete(id);
    if (!deletedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trip', error });
  }
};
