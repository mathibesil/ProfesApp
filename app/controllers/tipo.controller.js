var Tipo = require('../models/tipo.model.js');

// Create and Save a new tipo
exports.create = (req, res) => {
  let newTipo = new Tipo();
  newTipo.nombre = req.body.nombre;
  newTipo.descripcion = req.body.descripcion;
  newTipo.years = req.body.years;
  newTipo.save(err =>{
    if(err){
      res.status(500).json({ message: err });
    }
    res.status(200).json(newTipo);
  });
};

// Retrieve and return all tipos from the database.
exports.findAll = (req, res) => {
  Tipo
  .find()
  .then(tipos => {
    res.status(200).json(tipos);
  })
  .catch(err => {
    res.status(404).json({ message: "Error al recibir las tipos" });
  });
};

// Find a single tipo with a tipoId
exports.findOne = (req, res) => {
  Tipo.findById(req.params.tipoId)
     .then(tipo => {
         if(!tipo) {
             return res.status(404).json({
                 message: "Tipo no encontrada " + req.params.tipoId
             });
         }
         res.status(200).json(tipo);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).json({
                 message: "Tipo no encontrada " + req.params.tipoId
             });
         }
         return res.status(500).json({
             message: "Error al intentar obtener tipo " + req.params.tipoId
         });
     });
};

// Update a tipo identified by the tipoId in the request
exports.update = (req, res) => {
  Tipo
  .findByIdAndUpdate(req.params.tipoId, {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  },{new:true})
  .then(tipo =>{
    if(!tipo){
      return res.status(404).json({ message: "No hay tipos cono ese ID"});
    }
    return res.status(200).json(tipo);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay tipos con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar tipo" });
  });
};

// Delete a tipo with the specified tipoId in the request
exports.delete = (req, res) => {
  Tipo
  .findByIdAndRemove(req.params.tipoId)
  .then(tipo =>{
    if(!tipo){
      return res.status(404).json({ message: "No hay tipos cono ese ID"});
    }
    return res.status(200).json({ message: "Tipo eliminada correctamente" });
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay tipos con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar tipo" });
  });
};

// Delete a tipo with the specified tipoId in the request
exports.deleteAll = (req, res) => {
  Tipo
  .remove()
  .then(() =>{
    return res.status(200).json({ message: "Tipos eliminadas correctamente" });
  }).catch(err => {
    return res.status(500).json({ message: "Error al eliminar tipos" });
  });
};
