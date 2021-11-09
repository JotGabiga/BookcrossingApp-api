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
    votes:[Number],
    comments: [{
        _id: String,
        userId:String,
        fullName:String,
        text: String,
        time : { type : Date, default: Date.now()},
        spoiler: Boolean,
        parentId:String,
        checked: Boolean,
   },{
       _id:false
   }]
});


const Book = mongoose.model('Book', booksSchema);

module.exports = Book;

