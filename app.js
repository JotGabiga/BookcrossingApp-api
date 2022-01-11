
const Joi = require('joi');
const booksRouter = require('./controllers/booksController');
const tagsRouter = require('./controllers/tagsController');
const usersRouter = require('./controllers/usersController');
const express = require('express');

const mongoose = require('mongoose');


const corsMiddleware = require ('./cors');

const app = express();
app.use(corsMiddleware);

// app.use(cors({origin:'*'})); 
// app.use(express.json());
// app.use('/books', booksRouter);
// app.use('/tags',tagsRouter);
// app.use('/user',usersRouter);

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@bookcrossingcluster.mqqso.mongodb.net/bookcrossingCluster?retryWrites=true&w=majority`)
.then(()=>console.log('Connected to MongoDB..'))
.catch( err => console.error('Could not connect to MongoDB..',err))

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


