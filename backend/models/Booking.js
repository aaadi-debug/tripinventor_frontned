// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema({
//   // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   name: { type: String},
//   email: { type: String},
//   phone: { type: String},
//   date: { type: String},
//   noOfPeople: { type: Number},
// });

// module.exports = mongoose.model("Booking", BookingSchema);

const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  noOfPeople: { type: Number, required: true },
  destinationTitle: { type: String, required: true }, // Add this field
});

module.exports = mongoose.model("Booking", BookingSchema);
