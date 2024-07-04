const Book = require('./models/Book');
const mongoose = require('mongoose');

async function getBook(req, res) {
	const { id } = req.params;
	
    try {
        const result = await Book.findOne({ _id: new mongoose.Types.ObjectId(id) }).populate('author');
        if (result.deletedCount === 0) {
            return res.status(404).send('Book not found');
        }
		return res.status(200).send(result);
    } catch (error) {
        console.error('Error finding book:', error);
        return res.status(500).send({ error: error.message });
    }
}
module.exports = getBook;