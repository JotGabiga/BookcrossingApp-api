const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');
const booksService = require('../services/booksService');

const User = require('../models/userSchema');
const Joi = require('joi');

router.get('/', async (req, res) => { //added only for demo purpose
    try{
        const users = await usersService.getUser()
        res.send(users);
    }
    catch(ex) {
       res.status(500).send('Something failed.')
    }
});

router.get('/:id/readBooks', async (req, res) => {
    const user = await usersService.getUsersById(req.params.id);
    const readBooks = await booksService.getBooksByIdList(user.readBooks);
    if (!readBooks) return res.status(404).send("The book with given ID was not found") //404
    res.send(readBooks);
});

router.get('/:id/currentlyReadBooks', async (req, res) => {
    const user = await usersService.getUsersById(req.params.id);
    const readBooks = await booksService.getBooksByIdList(user.currentlyReadBooks);
    if (!readBooks) return res.status(404).send("The book with given ID was not found") //404
    res.send(readBooks);
});

router.get('/:id/wantToRead', async (req, res) => {
    const user = await usersService.getUsersById(req.params.id);
    const readBooks = await booksService.getBooksByIdList(user.wantToRead);
    if (!readBooks) return res.status(404).send("The book with given ID was not found") //404
    res.send(readBooks);
});

router.get('/:id/bookcrossing', async (req, res) => {
    const user = await usersService.getUsersById(req.params.id);
    const readBooks = await booksService.getBooksByIdList(user.bookcrossing);
    if (!readBooks) return res.status(404).send("The book with given ID was not found") //404
    res.send(readBooks);
});



router.get('/books', async (req, res) => {
    const books = await usersService.getUserBooks(req.query.bookIds); // bookIds Validation needed!!
    if (!books) return res.status(404).send("The book with given ID was not found") //404
    res.send(books);
});

router.get('/:id', async (req, res) => {

    const user = await usersService.getUsersById(req.params.id);
    console.log(user)
    if (!user) return res.status(404).send("The user with given ID was not found") //404
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message); //400  

   const user = new User ( {
    fullName: req.body.fullName,
    email: req.body.email,
    username: req.body.username,
    readBooks: req.body.readBooks,
    currentlyReadBooks: req.body.currentlyReadBooks,
    wantToRead: req.body.wantToRead,
    bookcrossing: req.body.bookcrossing
    });
    usersService.createUser(user);
    res.status(201).send(user);
});

router.put('/:id', async (req, res) => {
    const user = await usersService.updateUser(req.params.id,req.body);

    if (!user) return res.status(404).send("The user with given ID was not found") //404
    const { error } = validateUser(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);  //400

    user.id = parseInt(req.params.id);
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.readBooks = req.body.readBooks;
    user.currentlyReadBooks = req.body.currentlyReadBooks;
    user.wantToRead = req.body.wantToRead;
    user.bookcrossing = req.body.bookcrossing;
    
    res.status(204).send(user); 
});

function validateUser(user) {
    const schema = {
        fullName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        username: Joi.string().min(2).required(),
        readBooks: Joi.array().allow(""),
        currentlyReadBooks: Joi.array().allow(""),
        wantToRead: Joi.array().allow(""),
        bookcrossing: Joi.array().allow(""),
    };
    return Joi.validate(user, schema);   
}

router.delete ('/:id', async (req, res) => {
    const deletedUser = await usersService.deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).send("The user with given ID was not found") //404
    res.status(204).send()
});

module.exports = router;