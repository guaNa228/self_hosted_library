const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    country: String
}, {
    versionKey: false,
});


module.exports = mongoose.model('Author', authorSchema, 'Authors');
