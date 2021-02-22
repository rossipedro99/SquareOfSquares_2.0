const mongoose = require('mongoose');
const { Schema } = mongoose;


const quadradoSchema = new Schema({
  x: {
    type: Number,
    require: true
  },
  y: {
    type: Number,
    require: true
  },
  painted: {
    type: Boolean,
    require: false,
    default: false
  },
});


module.exports = mongoose.model('Quadrados', quadradoSchema);