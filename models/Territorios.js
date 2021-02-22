const mongoose = require('mongoose');
const { Schema } = mongoose;


const territorioSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  start: {
    type: Object,
    require: true
  },
  end: {
    type: Object,
    require: true
  },
  area: {
    type: Number,
    require: false
  },
  painted_area: {
    type: Number,
    require: false,
    default: 0
  },
  painted_squares: {
    type: Object,
    require: false,
  },
});


module.exports = mongoose.model('Territorio', territorioSchema);