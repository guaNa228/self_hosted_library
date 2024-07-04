const Author = require('./models/Author');
const mongoose = require('mongoose');

async function getOrCreateAuthor(name) {
    const authorDocuments = await Author.find({ name: name });
    if (authorDocuments.length > 0) {
        return authorDocuments[0]._id;
    } else {
        const newAuthorId = new mongoose.Types.ObjectId();
        const author = new Author({
            _id: newAuthorId,
            name: name
        });

        await author.save();
        return newAuthorId;
    }
}

module.exports.getOrCreateAuthor = getOrCreateAuthor;