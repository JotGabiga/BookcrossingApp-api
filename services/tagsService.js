const express = require('express');
const mongoose = require('mongoose');
const Tag = require('../models/tagSchema');

const average = arr => arr.reduce((a,b)=>a+b,0)/arr.length;

async function createTag(tag){
    const result = await tag.save()
}

async function getTags(){
    return await Tag
        .find()
        // .limit(100)
        // .sort({title:1})
        // .select({title:1, tags:1 });
};

async function getTagById(id){
    return await Tag
        .findById(id)
};

async function updateTag(id,tag){
    return await Tag
        .findById(id)
        .updateOne(tag)    
}; 

async function deleteTag(id){
    return await Tag
        .findByIdAndRemove(id)
};

module.exports = {createTag, getTags, getTagById, updateTag, deleteTag};