// data.js
const destinationData = {
    title: "New title of the d page",
    location: "United Kingdom",
    rating: 5,
    reviewCount: 1186,
    pricingData: {
        pricePerDayPerPerson: 150,
        bookingFee: 10,
        discount: 15,
        otherFees: 0
    },
    images: ["images/slider/1.jpg", "images/slider/2.jpg", "images/slider/3.jpg", "images/slider/7.jpg", "images/slider/8.jpg"],
    details: {
        duration: "10 Days",
        maxPeople: 26,
        // dateRange: "Jan 18 - Dec 21",
        // minAge: "10+",
        pickup: "Airport",
        languages: ["English", "Thai"]
    },
    description: [
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text...",
        "The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book",
        "new paragraph testing"
    ],
    additionalInfo: {
        departureLocation: "John F.K. International Airport(Google Map)",
        bedroom: "4 Bedrooms",
        arrivalTime: "3 Hours Before Flight Time",
        departureTime: "3 Hours Before Flight Time",
        includes: ["Air Fares", "3 Nights Hotel Accommodation", "Tour Guide", "Entrance Fees"],
        excludes: ["Guide Service Fee", "Driver Service Fee", "Any Private Expenses", "Room Service Fees"]
    },
    whattoexpect: [
        "New paragraph"
    ],
    itinerary: [
        { day: "Day 1", title: "Barcelona - Zaragoza - Madrid", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, inventore cumque veniam, praesentium velit incidunt rem quas a, quos eos ipsum, reprehenderit voluptatem." },
        { day: "Day 2", title: "Zurich - Biel/Bienne - Neuchatel - Geneva", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, inventore cumque veniam, praesentium velit incidunt rem quas a, quos eos ipsum, reprehenderit voluptatem." },
        { day: "Day 3", title: "Enchanting Engelberg", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, inventore cumque veniam, praesentium velit incidunt rem quas a, quos eos ipsum, reprehenderit voluptatem." },
        { day: "Day 4", title: "Barcelona - Zaragoza - Madrid", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, inventore cumque veniam, praesentium velit incidunt rem quas a, quos eos ipsum, reprehenderit voluptatem." }
    ],
    reviews: [
        {   
            name: "Sahil",
            date: "April 25, 2019",
            rating: 5,
            src: "images/reviewer/default.jpg",
            title: "The worst hotel ever",
            content: "Take in the iconic skyline and visit the neighbourhood hangouts that you've only ever seen on TV."
        },
        // Additional reviews can be added here
    ]
};
