
const Joi = require('joi');
const booksRouter = require('./controllers/booksController');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use('/books', booksRouter);



mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@bookcrossingcluster.mqqso.mongodb.net/bookcrossingCluster?retryWrites=true&w=majority`)
.then(()=>console.log('Connected to MongoDB..'))
.catch( err => console.error('Could not connect to MongoDB..',err))

//Allow origin Acces origin and methods..
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Credentials",true);
    res.setHeader("Access-Control-Allow-Methods",POST, GET, PUT, DELETE, OPTIONS);
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    next();
})


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


