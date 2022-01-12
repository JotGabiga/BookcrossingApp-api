const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/bookSchema');

const average = arr => arr.reduce((a,b)=>a+b,0)/arr.length;

async function createBook(book){
    return await book.save()
}


async function getBooks(tag, skip){
    return await Book 
        .find(tag ? {tags:tag} : null)
        .limit(9)
        .sort({title:1})
        .skip(parseInt(skip, 10))
    };

    
async function getBookById(id){
    return await Book
        .findById(id)
};

async function updateBook(id,book){
    return await Book
        .findById(id)
        .updateOne(book)    
}; 
async function updateVotes(id,fieldsToUpdate){
    const ratingValue = Math.round( average(fieldsToUpdate.votes) * 10) / 10
    return updateBook(id,{rating:ratingValue,votes:fieldsToUpdate.votes})    
}; 

async function patchBook(id,fieldsToUpdate){
    if(fieldsToUpdate.votes){
        fieldsToUpdate.rating = Math.round( average(fieldsToUpdate.votes) * 10) / 10
    }
    return updateBook(id,fieldsToUpdate)    
}; 

async function deleteBook(id){
    return await Book
        .findByIdAndRemove(id)
};

async function deleteBookComment(id, commentId){
    Book.findById(id, function(err, book){
        console.log(book)
    book.comments = book.comments.filter(item => item._id.valueOf() !== commentId);
    updateBook(id,book);
    })
};

async function getBooksByIdList(bookIds){
    return await Book
    .find({ '_id': { $in: bookIds} });
};

module.exports = {getBooks, createBook, getBookById, deleteBook, updateBook, patchBook, updateVotes,getBooksByIdList,deleteBookComment};
