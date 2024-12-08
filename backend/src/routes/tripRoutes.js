const { Router } = require('express');
const { getTrips, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');

const router = Router();

// Get all trips
router.get('/', getTrips);

// Create a new trip
router.post('/', createTrip);

// Update trip details by ID
router.put('/:id', updateTrip);

// Delete a trip by ID
router.delete('/:id', deleteTrip);

module.exports = router;
