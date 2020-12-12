require('newrelic');
var path = require('path');
var bodyParser = require('body-parser')
var express = require('express');
var router = express.Router()
var mongoose = require('mongoose')



var app = express();
var indexRouter = require('./routes/index.js');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());



var mongoDb = require('../config.js')

mongoose.connect(mongoDb.dbLocation, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('connected', (err) => {
  if(!err){
    console.log('connected to db')
  }
});

app.listen(9000, () => {
   console.log('Server listening on 9000');
})

app.get('/', (req, res) =>
  res.send('Hola World')
  )

app.use('/api', indexRouter);


module.exports = app;
