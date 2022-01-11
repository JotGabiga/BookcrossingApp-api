const express = require('express');
const router = express.Router();
const tagsService = require('../services/tagsService');
const Tag = require('../models/tagSchema');
const Joi = require('joi');

router.get('/', async (req, res) => {
    try{
        const tags = await tagsService.getTags()
        res.send(tags);
    }
    catch(ex) {
       res.status(500).send('Something failed.')
    }
});

router.get('/:id', async (req, res) => {

    const tag = await tagsService.getTagById(req.params.id);
    if (!tag) return res.status(404).send("The tag with given ID was not found") //404
    res.send(tag);
});

router.post('/', async (req, res) => {
    const { error } = await validateTag(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message); //400  

   const tag = new Tag ( {
        tag: req.body.tag,
    });
    tagsService.createTag(tag);
    res.status(201).send(tag);
});

router.put('/:id', async (req, res) => {
    const tag = await tagsService.updateTag(req.params.id,req.body);

    if (!tag) return res.status(404).send("The tag with given ID was not found") //404
    const { error } = validateTag(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);  //400

    tag.id = parseInt(req.params.id);
    tag.tag = req.body.tags;

    res.status(204).send(tag); 
});

function validateTag(tag) {
    const schema = {
        tag: Joi.string().min(2).required(),
    };
    return Joi.validate(tag, schema);   
}

router.delete ('/:id', async (req, res) => {
    const deletedTag = await tagsService.deleteTag(req.params.id);
    if (!deletedTag) return res.status(404).send("The tag with given ID was not found") //404
    res.status(204).send()
});

module.exports = router;