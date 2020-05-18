const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
require('dotenv').config()

const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");

const routes = require('./routes')

app.use(bodyParser.json());
app.use(express.json());

const {
	MONGODB_URI,
  PORT = 8080,
} = process.env

mongoose.connect(`${MONGODB_URI}`)
const db = mongoose.connection

db
  .on('error', error => console.log(error))
  .once('open', () => {
    console.log('Database Connected!')
    http.listen(PORT, (error) => {
      if(error){
        console.log(error)
      }
      else{
        console.log(`Server online: connected to port ${PORT}`)
      }
    });
  })

app.use(express.static(path.join(__dirname, "../build")));

app.get(routes, function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const game = require('./sockets')(http)