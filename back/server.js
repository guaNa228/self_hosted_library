const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Change '*' to a specific origin if needed
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/Books');

app.listen(3000, function () {
    console.log("the server is running");
});

const getBooks = require('./getBooks');
app.get("/", getBooks);

const addBook = require('./addBook');
app.post("/", addBook);

const deleteBook = require('./deleteBook');
app.delete("/:id", deleteBook);

const updateBook = require('./updateBook');
app.patch("/:id", updateBook);

const getAuthors = require('./getAuthors');
app.get("/authors", getAuthors);

const getBookByISBN = require('./getBookByISBN');
app.get("/isbn/:isbn", getBookByISBN);

const getBookByID = require('./getBook');
app.get("/:id", getBookByID);