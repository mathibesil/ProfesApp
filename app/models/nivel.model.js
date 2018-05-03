const mongoose = require('mongoose');
var Tipo = require('./tipo.model.js');
var Schema = mongoose.Schema;

const NivelSchema = mongoose.Schema({
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
tipos: [{ type: Schema.Types.ObjectId, ref: 'Tipo' }]
});

module.exports = mongoose.model('Nivel', NivelSchema);
