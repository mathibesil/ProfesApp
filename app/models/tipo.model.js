const mongoose = require('mongoose');
var Year = require('./year.model.js');
var Schema = mongoose.Schema;

const TipoSchema = mongoose.Schema({
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
  },
  years: [{ type: Schema.Types.ObjectId, ref: 'Year' }]
});

module.exports = mongoose.model('Tipo', TipoSchema);
