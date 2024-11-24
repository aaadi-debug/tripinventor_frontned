const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// Submit review form
router.post("/reviews", async (req, res) => {
    try {
        const { name, email, comment, rating, date } = req.body;

        // Validate input
        if (!name || !email || !comment || !date || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save review to MongoDB
        const newReview = new Review({ name, email, comment, date, rating });
        await newReview.save();

        res.status(201).json({ message: "Review saved successfully!" });
    } catch (err) {
        console.error("Error posting review:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all reviews
router.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find(); // Retrieve all reviews from MongoDB
        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single review by ID
router.get("/reviews/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id); // Retrieve a review by its ID
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(review);
    } catch (err) {
        console.error("Error fetching review:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a review by ID
router.delete("/reviews/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the review exists
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Delete the review
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: "Review deleted successfully!" });
    } catch (err) {
        console.error("Error deleting review:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
