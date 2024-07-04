const Author = require('./models/Author');

async function getAllAuthors(req, res) {
    try {
        const documents = await Author.find({});
        res.status(200).send(documents);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getAllAuthors;