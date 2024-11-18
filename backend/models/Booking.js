const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
