const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tag: String
});

const Tag = mongoose.model('Tags', tagSchema);

module.exports = Tag;
