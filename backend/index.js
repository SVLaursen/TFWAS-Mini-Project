//In order to test the server locally use nodemon in the command line / terminal

const express = require('express');
const mongoose = require('mongoose');
const bodyparse = require('body-parser');
const cors = require('cors');

const app = express();
const route = require('./route/routes.js');

//Connects to the MongoDB cloud database and targets the TFWAS cluster
//The connection is a promise with a catch for errors
mongoose.connect('mongodb+srv://simon:admin@developmentcluster-jrbzk.mongodb.net/tfwas?retryWrites=true&w=majority')
    .then(() => console.log('Mongoose connected to MongoDB database'))
    .catch((err) => console.log(err));

//Adding in CORS
app.use(cors());

//Adding in body-parser
app.use(bodyparse.json());

//Setting up server application routing
app.use('/api', route);

const PORT = process.env.PORT || 3600;

app.listen(PORT, () =>{
    console.log('Server has been started with port: ' + PORT);
});

//Default message that shows up on a get call
app.get('/', (req, res) => {
    res.send('TFWAS Backend - /api/');
});