const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Fetch all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new destination
router.post('/', async (req, res) => {
    try {
        const destination = new Destination(req.body);
        const savedDestination = await destination.save();
        res.status(201).json(savedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a destination
router.put('/:id', async (req, res) => {
    try {
        const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json(updatedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a destination
router.delete('/:id', async (req, res) => {
    try {
        const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
        if (!deletedDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json({ message: 'Destination deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
