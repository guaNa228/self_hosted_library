const mongoose = require('mongoose');
const Author = require('./Author');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    author: {
        type: Schema.Types.ObjectId,
        ref: Author,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
    }
}, { versionKey: false });

//Compiled model
module.exports = mongoose.model('Book', bookSchema, 'Books');

