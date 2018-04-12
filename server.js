//server.js

const express      = require('express');
const MongoClient  = require('mongodb').MongoClient;
const bodyParser   = require('body-parser');
const db           = require('./config/db');
const app          = express();

//Start listening for requests on a port

const port = 8000;

//process URL encoded forms
app.use(bodyParser.urlencoded({extended:true}));

//Connect to the database
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
   

    
    require ('./app/routes') (app,database);

    app.listen(port, () => {
        console.log(`we are live on ${port}`);
        })

})







