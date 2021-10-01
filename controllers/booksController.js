const express = require('express');
const router = express.Router();
const booksService = require('../services/booksService');
const Book = require('../models/bookSchema');
const Joi = require('joi');

router.get('/', async (req, res) => {
    try{
        const books = await booksService.getBooks()
        res.send(books);
    }
    catch(ex) {
       res.status(500).send('Something failed.')
    }
});

router.get('/:id', async (req, res) => {

    const book = await booksService.getBookById(req.params.id);
    console.log(book)
    if (!book) return res.status(404).send("The book with given ID was not found") //404
    res.send(book);
});

router.post('/', async (req, res) => {
    const { error } = await validateBook(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message); //400  

   const book = new Book ( {
        title: req.body.title,
        authors: req.body.authors,
        releaseDate: new Date(req.body.releaseDate+"T00:00:00Z"),
        description: req.body.description,
        cover: req.body.cover,
        publishingHouse: req.body.publishingHouse,
        tags: req.body.tags,
        votes: req.body.votes
    });
    booksService.createBook(book);
    res.status(201).send(book);
});

router.put('/:id', async (req, res) => {
    const book = await booksService.updateBook(req.params.id,req.body);

    if (!book) return res.status(404).send("The book with given ID was not found") //404
    const { error } = validateBook(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);  //400

    book.id = parseInt(req.params.id);
    book.title = req.body.title;
    book.authors = req.body.authors;
    book.releaseDate = new Date(req.body.releaseDate+"T00:00:00Z");
    book.description = req.body.description;
    book.cover = req.body.cover;
    book.publishingHouse = req.body.publishingHouse;
    book.tags = req.body.tags;
    book.votes = req.body.votes;

    res.status(204).send(book); 
});

router.patch('/:id', async (req, res) => {
    const book = await booksService.updateVotes(req.params.id,req.body);
    
    if (!book) return res.status(404).send("The book with given ID was not found") //404
    const { error } = validateVotes(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);  //400

    res.status(204).send(book); 
});


function validateBook(book) {
    const schema = {
        title: Joi.string().min(2).required(),
        authors: Joi.array().items(Joi.string().required()),
        releaseDate: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        rating: Joi.string().min(0).allow(""),
        cover: Joi.string().min(0).allow(""),
        publishingHouse: Joi.string().min(2).required(),
        tags: Joi.array().items(Joi.string()),
        votes: Joi.array().allow("")
    };
    return Joi.validate(book, schema);   
}

function validateVotes(votes) {
    const schema = {
        votes: Joi.array().allow("")
    };
    return Joi.validate(votes, schema);   
}

router.delete ('/:id', async (req, res) => {
    const deletedBook = await booksService.deleteBook(req.params.id);
    if (!deletedBook) return res.status(404).send("The book with given ID was not found") //404
    res.status(204).send()
});

module.exports = router;