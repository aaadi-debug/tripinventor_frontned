const express = require("express");
const Subscriber = require("../models/Subscriber"); // Your subscriber schema
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const subscribers = []; // Temporary in-memory storage. Replace with a database in production.

// Subscribe to newsletter
router.post("/subscribers", async (req, res) => {
  const { email } = req.body;
  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "You are already subscribed." });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all subscribers for admin
router.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single subscriber by ID
router.get("/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber = await Subscriber.findById(id); // Retrieve a subscriber by its ID
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.status(200).json(subscriber);
  } catch (err) {
    console.error("Error fetching subscriber:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a subscribers by ID
router.delete("/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the booking exists
    const subscribers = await Subscriber.findById(id);
    if (!subscribers) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    // Delete the booking
    await Subscriber.findByIdAndDelete(id);
    res.status(200).json({ message: "Subscriber deleted successfully!" });
  } catch (err) {
    console.error("Error deleting subscriber:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// POST route to send newsletter with PDF attachment
router.post("/send-newsletter", upload.single("pdf"), async (req, res) => {
  const { subject } = req.body;
  const pdfPath = req.file.path; // Path to the uploaded PDF

  try {
    console.log(pdfPath);
    console.log(req.file);
    // Log uploaded file details
    console.log("File uploaded:", req.file);

    // Log request body
    console.log("Request body:", req.body);

    
    const subscribers = await Subscriber.find();
    const emails = subscribers.map((sub) => sub.email);

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adparker51202@gmail.com",
        pass: "jmugbaleiezdzlyr", // Use an app password for security
      },
    });

    const mailOptions = {
      from: "adparker51202@gmail.com",
      to: emails,
      subject,
      text: "Please find the attached newsletter.", // Fallback text content
      attachments: [
        {
          filename: req.file.originalname,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Newsletter sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send newsletter." });
  }
});

module.exports = router;
