const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

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


// Fetch all blogs or a specific blog by title
router.get('/', async (req, res) => {
    try {
        const { title } = req.query;

        if (title) {
            // Fetch a single blog by title
            const blog = await Blog.findOne({ title });
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            return res.status(200).json(blog);
        }

        // Fetch all blogs
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new blog
router.post('/', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a blog
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
