
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

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


