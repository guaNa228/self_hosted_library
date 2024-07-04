const { getOrCreateAuthor } = require('./utils');
const Book = require('./models/Book');
const mongoose = require('mongoose');

async function addBook(req, res) {
    try {
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            image_url: req.body.image_url
        });

        getOrCreateAuthor(req.body.author).then(async authorId => {
            book.author = authorId;
            const savedBook = await book.save();
            const savedBookToSend = await savedBook.populate('author');
            res.status(201).send(savedBookToSend);
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = addBook;
