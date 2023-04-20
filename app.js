const express = require('express');
const app = express();

const books = [
    {
        'id': 1,
        'title': 'La hojarasca',
        'description': 'Good one',
        'author': 'Gabo'
    },
    {
        'id': 2,
        'title': 'El coronel no tiene quien le escriba',
        'description': 'Interesting',
        'author': 'Gabo'
    }
];

// Get all books
app.get('/books', (req, res) => {
    res.json({'books': books});
});

// Get one book by id
app.get('/books/:book_id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.book_id));
    if (!book) return res.status(404).send('Book not found');
    res.json({'book': book});
});

// Add new book
app.post('/books', (req, res) => {
    if (!req.body.title) return res.status(400).send('Title is required');
    const book = {
        'id': books.length + 1,
        'title': req.body.title,
        'description': req.body.description || '',
        'author': req.body.author || ''
    };
    books.push(book);
    res.status(201).json({'book': book});
});

// Edit a Book
app.put('/books/:book_id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.book_id));
    if (!book) return res.status(404).send('Book not found');
    book.title = req.body.title || book.title;
    book.description = req.body.description || book.description;
    book.author = req.body.author || book.author;
    res.json({'book': book});
});

// Delete a Book
app.delete('/books/:book_id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.book_id));
    if (!book) return res.status(404).send('Book not found');
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.json({'result': true});
});

app.listen(5000, () => console.log('Server started on port 5000'));
