const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// Submit contact form
router.post("/contacts", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!phone) {
            return res.status(400).json({ message: "Phone is required" });
        }

        // Save contact to MongoDB
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        res.status(201).json({ message: "Contact saved successfully!" });
    } catch (err) {
        console.error("Error saving contact:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all contacts
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find(); // Retrieve all contacts from MongoDB
        res.status(200).json(contacts);
    } catch (err) {
        console.error("Error fetching contacts:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single contact by ID
router.get("/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await COntact.findById(id); // Retrieve a contact by its ID
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (err) {
        console.error("Error fetching contact:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a contact by ID
router.delete("/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the contact exists
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        // Delete the contact
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: "Contact deleted successfully!" });
    } catch (err) {
        console.error("Error deleting contact:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
