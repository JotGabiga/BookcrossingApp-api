
const Joi = require('joi');
const booksRouter = require('./controllers/booksController');
const tagsRouter = require('./controllers/tagsController');
const usersRouter = require('./controllers/usersController');
const express = require('express');
const mongoose = require('mongoose');



const app = express();

const cors = require('cors');
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Request-Headers", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH.');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
//   });

// const corsMiddleware = require ('./cors');
// app.use(corsMiddleware);
app.use(cors());
app.use(express.json());
app.use('/books', booksRouter);
app.use('/tags',tagsRouter);
app.use('/user',usersRouter);

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@bookcrossingcluster.mqqso.mongodb.net/bookcrossingCluster?retryWrites=true&w=majority`)
.then(()=>console.log('Connected to MongoDB..'))
.catch( err => console.error('Could not connect to MongoDB..',err))
 
//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


