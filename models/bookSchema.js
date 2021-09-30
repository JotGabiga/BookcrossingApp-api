const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: String,
    authors:[String],
    releaseDate: { type:Date, default: Date.now()},
    description:String,
    rating: String,
    cover: String,
    publishingHouse: String,
    tags: [String],
    votes:[Number]
});

const Book = mongoose.model('Book', booksSchema);

module.exports = Book;
