const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// // Fetch all destinations
// router.get('/', async (req, res) => {
//     // try {
//     //     const destinations = await Destination.find();
//     //     res.status(200).json(destinations);
//     // } catch (error) {
//     //     res.status(500).json({ message: error.message });
//     // }

//     const { title } = req.query;
//     const destination = await Destination.findOne({ title });
//     if (!destination) {
//         return res.status(404).json({ message: 'Destination not found' });
//     }
//     res.status(200).json(destination);
// });
function serchQuery(title) {
    // Build a dynamic query
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search

    // // Fetch destinations based on the query
    const destinationss = Destination.find(query);

    if (destinations.length === 0) {
        return res.status(404).json({ message: 'No destinations found' });
    }

    return res.status(200).json(destinationss);
}
// Fetch all destinations or a specific destination by title
router.get('/', async (req, res) => {
    try {
        const { title, location, price } = req.query;

        if (title) {
            // Fetch a single destination by title
            const destination = await Destination.findOne({ title });
            if (!destination) {
                return res.status(404).json({ message: 'Destination not found' });
            }
            return res.status(200).json(destination);
        }

        // Fetch all destinations
        const destinations = await Destination.find();
        res.status(200).json(destinations);
        // serchQuery(title)


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
