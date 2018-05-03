const Nivel = require('../models/nivel.model.js');

// Create and Save a new nivel
exports.create = (req, res) => {
  let newNivel = new Nivel();
  newNivel.nombre = req.body.nombre;
  newNivel.descripcion = req.body.descripcion;
  newNivel.tipos = req.body.tipos;

  newNivel.save(err =>{
    if(err){
    return  res.status(500).json({ message: err });
    }
    return res.status(200).json(newNivel);
  });
};

// Retrieve and return all niveles from the database.
exports.findAll = (req, res) => {
  Nivel
  .find()
  .then(niveles => {
    res.status(200).json(niveles);
  })
  .catch(err => {
    res.status(404).json({ message: "Error al recibir las niveles" });
  });
};

// Find a single nivel with a nivelId
exports.findOne = (req, res) => {
  Nivel.findById(req.params.nivelId)
     .then(nivel => {
         if(!nivel) {
             return res.status(404).json({
                 message: "Nivel no encontrada " + req.params.nivelId
             });
         }
         res.status(200).json(nivel);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).json({
                 message: "Nivel no encontrada " + req.params.nivelId
             });
         }
         return res.status(500).json({
             message: "Error al intentar obtener nivel " + req.params.nivelId
         });
     });
};

// Update a nivel identified by the nivelId in the request
exports.update = (req, res) => {
  Nivel
  .findByIdAndUpdate(req.params.nivelId, {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    materias: req.body.materias
  },{new:true})
  .then(nivel =>{
    if(!nivel){
      return res.status(404).json({ message: "No hay niveles cono ese ID"});
    }
    return res.status(200).json(nivel);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay niveles con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar nivel" });
  });
};

// Delete a nivel with the specified nivelId in the request
exports.delete = (req, res) => {
  Nivel
  .findByIdAndRemove(req.params.nivelId)
  .then(nivel =>{
    if(!nivel){
      return res.status(404).json({ message: "No hay niveles cono ese ID"});
    }
    return res.status(200).json({ message: "Nivel eliminada correctamente" });
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay niveles con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar nivel" });
  });
};

// Delete a nivel with the specified nivelId in the request
exports.deleteAll = (req, res) => {
  Nivel
  .remove()
  .then(() =>{
    return res.status(200).json({ message: "Niveles eliminadas correctamente" });
  }).catch(err => {
    return res.status(500).json({ message: "Error al eliminar niveles" });
  });
};
