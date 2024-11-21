const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discount: { type: String },
    image: { type: String },
    rating: { type: Number, default: 0 },
    places: { type: String },
    location: { type: String },
    price: { type: String },
    duration: { type: String },
    reviewCount: { type: Number, default: 0 },
    pricingData: {
        pricePerDayPerPerson: { type: Number },
        bookingFee: { type: Number },
        discount: { type: Number },
        otherFees: { type: Number }
    },
    images: [{ type: String }],
    details: {
        duration: { type: String },
        maxPeople: { type: String },
        pickup: { type: String },
        languages: [{ type: String }]
    },
    descriptions: [{ type: String }],
    additionalInfo: {
        location: { type: String },
        bedroom: { type: String },
        arrivalTime: { type: String },
        departureTime: { type: String },
        includes: [{ type: String }],
        excludes: [{ type: String }]
    },
    whattoexpect: [{ type: String }],
    itinerary: [
        {
            id: { type: Number },
            day: { type: String },
            title: { type: String },
            content: [{ type: String }]
        }
    ],
    reviews: [
        {
            name: { type: String },
            date: { type: String },
            rating: { type: Number },
            src: { type: String },
            title: { type: String },
            content: { type: String }
        }
    ]
});

module.exports = mongoose.model('Destination', DestinationSchema);
    