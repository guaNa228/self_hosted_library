const Book = require('./models/Book');
const mongoose = require('mongoose');

async function deleteBook(req, res) {
    const { id } = req.params;

    try {
        const result = await Book.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Book not found or already deleted.');
        }
        res.send({ message: 'Book successfully deleted', deletedBookId: id });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = deleteBook;