const express = require('express')
const router = express.Router();
const PresentModel = require('../schemaModels/presentSchemaModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const cookieParser = require('cookie-parser');
router.use(cookieParser());



// JWT Verify
const verifyToken = (req, res, next) => {
    const token = req.cookies?.myToken; // Extract token properly
    console.log(token)
 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token" });
        }
        req.user = decoded; // Store user info
        
        next();
    });
};

// Add on present
router.post('/', verifyToken,  async(req, res)=>{
    try{
        const result = await PresentModel(req.body).save();
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message)
    }
});

// Get Phy
router.get('/phy', async(req, res)=>{
    try{
        const result = await PresentModel.find({"course" : "phy"});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message)
    }
});

// Get EEE
router.get('/eee', async(req, res)=>{
    try{
        const result = await PresentModel.find({"course" : "eee"});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message)
    }
});






module.exports = router;