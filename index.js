// npm i express mongoose cors dotenv jsonwebtoken cookie-parser

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookeiParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
// Env files
const uri = process.env.URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Use Middlewares
app.use(express.json());
app.use(cookeiParser());
app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://muntasir-backend.vercel.app'
    ], 
    credentials: true,
}));

// Mongoose Connection
mongoose.connect(uri)
.then(()=> console.log("MongoDb Conneted Successfully"))
.catch((err)=> console.log("Connection Error on mongodb"))


// Auth related Api
app.post('/jwt', async(req, res)=>{
    const user = req.body;
    
    const token = jwt.sign(user, JWT_SECRET, {expiresIn: '1h'});

    res.cookie("myToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
  .send({mySuccess: true})
})
// Delete cookie
// app.get('/jwt/logout', (req, res) => {
//   res.clearCookie('myToken', { path: '/' });
//   res.clearCookie('myToken', { path: '/', httpOnly: true, secure: true, sameSite: 'none' });
//   res.status(200).send('Logged out');
// });

// Delete cookie
app.get('/jwt/logout', (req, res) => {
  res.clearCookie('myToken', {
    path: '/', 
    httpOnly: true, 
    secure: true, 
    sameSite: 'none'
  });
  res.status(200).send('Logged out');
});







// Router Handlers 
const todoHandler = require('./routeHandlers/todoHandler');
const studentHandler = require('./routeHandlers/studentHandler');
const presentHandler = require('./routeHandlers/presentHandler');

app.use('/todo', todoHandler);
app.use('/student', studentHandler);
app.use('/present', presentHandler);


app.get('/johfa', (req, res)=> {
  res.send("I love u")
})






app.get('/', (req, res)=>{
    res.send('Hello');
    console.log('World');
})

app.listen(port, ()=>{
   console.log('Server is Running in Port: ', port);
});