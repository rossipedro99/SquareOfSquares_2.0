const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

const territories = require('./routes/territorios');
const squares = require('./routes/quadrados');

app.use('/api/', territories);
app.use('/api/', squares);


mongoose
  .connect('mongodb://db:27017/nodejs_vitta', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });
  

app.listen(8888, () => console.log('Server ativo na porta 8888'));