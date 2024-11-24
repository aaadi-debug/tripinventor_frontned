const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    image: { type: String },
    date: { type: String },
    title: { type: String, required: true },
    link: { type: String},
    category: { type: String},
    author: { type: String},
    description: { type: String},
    content: { type: String},
});

module.exports = mongoose.model('Blog', BlogSchema);
    