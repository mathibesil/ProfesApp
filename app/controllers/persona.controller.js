const Persona = require('../models/persona.model.js');

// Create and Save a new persona
exports.create = (req, res) => {
  let newPersona = new Persona();
  newPersona.nombre = req.body.nombre;
  newPersona.apellido = req.body.apellido;
  newPersona.materiasDar = req.body.materiasDar;
  newPersona.materiasCursar = req.body.materiasCursar;
  newPersona.save(err =>{
    if(err){
      res.status(500).json({ message: err });
    }
    res.status(200).json(newPersona);
  });
};

// Retrieve and return all personas from the database.
exports.findAll = (req, res) => {
  Persona
  .find()
  .then(personas => {
    res.status(200).json(personas);
  })
  .catch(err => {
    res.status(404).json({ message: "Error al recibir las personas" });
  });
};

// Find a single persona with a personaId
exports.findOne = (req, res) => {
  Persona.findById(req.params.personaId)
     .then(persona => {
         if(!persona) {
             return res.status(404).json({
                 message: "Persona no encontrada " + req.params.personaId
             });
         }
         res.status(200).json(persona);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).json({
                 message: "Persona no encontrada " + req.params.personaId
             });
         }
         return res.status(500).json({
             message: "Error al intentar obtener persona " + req.params.personaId
         });
     });
};

// Update a persona identified by the personaId in the request
exports.update = (req, res) => {
  Persona
  .findByIdAndUpdate(req.params.personaId, {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    materiasDar: req.body.materiasDar,
    materiasCursar: req.body.materiasCursar
  },{new:true})
  .then(persona =>{
    if(!persona){
      return res.status(404).json({ message: "No hay personas cono ese ID"});
    }
    return res.status(200).json(persona);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay personas con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar persona" });
  });
};

// Delete a persona with the specified personaId in the request
exports.delete = (req, res) => {
  Persona
  .findByIdAndRemove(req.params.personaId)
  .then(persona =>{
    if(!persona){
      return res.status(404).json({ message: "No hay personas cono ese ID"});
    }
    return res.status(200).json({ message: "Persona eliminada correctamente" });
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay personas con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar persona" });
  });
};

// Delete a persona with the specified personaId in the request
exports.deleteAll = (req, res) => {
  Persona
  .remove()
  .then(() =>{
    return res.status(200).json({ message: "Personas eliminadas correctamente" });
  }).catch(err => {
    return res.status(500).json({ message: "Error al eliminar personas" });
  });
};
