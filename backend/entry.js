//In order to test the server locally use nodemon in the command line / terminal

var express = require('express');
var mongoose = require('mongoose');
var bodyparse = require('body-parser');
var cors = require('cors');

var app = express();
const route = require('./route/routes.js');

//Connects to the MongoDB cloud database and targets the TFWAS cluster
mongoose.connect('mongodb+srv://simon:admin@developmentcluster-jrbzk.mongodb.net/tfwas?retryWrites=true&w=majority');

//On connection success
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to MongoDB database')
});

//Mongoose had an error while trying to connect to database
mongoose.connection.on('error', (err)=>{
    console.log(err);
});

//Adding in CORS
app.use(cors());

//Adding in body-parser
app.use(bodyparse.json());

//Setting up server application routing
app.use('/api', route);

const PORT = 3600;

app.listen(PORT, () =>{
    console.log('Server has been started with port: ' + PORT);
});

app.get('/', (req, res) => {
    res.send('TFWAS Backend - /api/');
});