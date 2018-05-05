const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const YearSchema = mongoose.Schema({
  nombre: {
    type: String,
    default: "",
    unique: true,
    required: true,
    trim: true  
  },
  descripcion: {
    type: String,
    default: "",
    trim: true
  }
});

module.exports = mongoose.model('Year', YearSchema);
