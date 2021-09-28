const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/bookSchema');

async function createBook(book){
    const result = await book.save()
console.log(result);
}

async function getBooks(){
    return await Book
        .find()
        .limit(100)
        .sort({title:1})
        // .select({title:1, tags:1 });
};

async function getBookById(id){
    return await Book
        .findById(id)
};

async function updateBook(id, update){
    return await Book
        .findById(id)
        .updateOne( update)    
}; 

async function deleteBook(id){
    return await Book
        .findByIdAndRemove(id)
};

module.exports = {getBooks, createBook, getBookById, deleteBook, updateBook};
