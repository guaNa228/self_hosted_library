const Book = require('./models/Book');

async function getAllBooks(req, res) {
    try {
        const documents = await Book.find({}).populate('author');
        res.send(documents);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getAllBooks;
