const Book = require('./models/Book');
const mongoose = require('mongoose');
const { getOrCreateAuthor } = require('./utils');

async function updateBook(req, res) {
    const { id } = req.params;

    try {
        const result = await Book.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!result) {
            return res.status(404).send('Book not found');
        } else {
            result.name = req.body.name;
            result.image_url = req.body.image_url;
            result.rating = req.body.rating;
            result.comment = req.body.comment;

            getOrCreateAuthor(req.body.author).then(async authorId => {
                result.author = authorId;
                result.save();
                return res.status(200).send({ message: 'Book successfully updated', updatedBookId: id });
            });
        }

    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = updateBook;