const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema');

async function createUser(user){
    return await user.save()
}

async function getUser(){
    return await User
        .findOne()
};

async function getUsersById(id){
    return await User
        .findById(id)
};

async function updateUser(id,user){
    return await User
        .findById(id)
        .updateOne(user)    
}; 

async function deleteUser(id){
    return await User
        .findByIdAndRemove(id)
};

module.exports = {createUser, getUser, getUsersById, updateUser, deleteUser};