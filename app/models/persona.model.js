var mongoose = require('mongoose');
var Materia = require('./materia.model.js');
var Schema = mongoose.Schema;

const personaSchema = new Schema({
  nombre: {
    type: String,
    default: "",
    unique: true,
    required: true,
    trim: true
  },
  apellido: String, default: "",
  materiasDar: [{ type: Schema.Types.ObjectId, ref: 'Materia' }],
  materiasCursar: [{ type: Schema.Types.ObjectId, ref: 'Materia' }]
});

module.exports = mongoose.model('Persona', personaSchema);
