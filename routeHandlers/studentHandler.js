const express = require('express');
const router = express.Router();
const StudentModel = require('../schemaModels/studentSchemaModel');

router.get('/', async(req, res)=>{
    try{
        const result = await StudentModel.find({}).sort({id:1});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/', async(req, res)=>{
    try{
        const result = await StudentModel.deleteMany({});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})



module.exports = router;