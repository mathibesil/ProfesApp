const mongoose = require('mongoose');
var Year = require('./year.model.js');
var Tipo = require('./tipo.model.js');
var Nivel = require('./nivel.model.js');
var Schema = mongoose.Schema;
const MateriaSchema = mongoose.Schema({
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
  years: [{ type: Schema.Types.ObjectId, ref: 'Year' }],
  tipos: [{ type: Schema.Types.ObjectId, ref: 'Tipo' }],
  niveles: [{ type: Schema.Types.ObjectId, ref: 'Nivel' }]
});
module.exports = mongoose.model('Materia', MateriaSchema);
