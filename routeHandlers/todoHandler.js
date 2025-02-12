const express = require('express');
const router = express.Router();
const ToDo = require('../schemaModels/todoSchemaModel');

// Get todo items by email 
router.get('/:email', async(req, res)=>{
    try{
        const result = await ToDo.find({});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err);
    }
});

// Post todo item 
router.post('/', async(req, res)=>{
    try{
        const result = await ToDo(req.body).save();
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err);
    }
});

// update todo item
router.put('/', async(req, res)=>{
    console.log(req.body)
    try{
        const result = await ToDo.updateOne(
            { _id: req.body._id },           // Filter by ID
            { $set: { todo: req.body.todo } }  // Correct way to update a field
        );
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err);
    }
});

// Delete todo item
router.delete('/:id', async(req, res)=>{
    console.log(req.params.id)
    try{
        const result = await ToDo.deleteOne({_id: req.params.id});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;