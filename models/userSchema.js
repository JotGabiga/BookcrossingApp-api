const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fullName: String,
    email:String,
    username:String,
    readBooks: [String],
    currentlyReadBooks: [String],
    wantToRead:[String],
    bookcrossing:[String]
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
