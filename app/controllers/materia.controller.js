var Materia = require('../models/materia.model.js');

// Create and Save a new materia
exports.create = (req, res) => {
  let newMateria = new Materia();
  newMateria.nombre = req.body.nombre;
  newMateria.descripcion = req.body.descripcion;
  newMateria.years = req.body.years;
  newMateria.tipos = req.body.tipos;
  newMateria.niveles = req.body.niveles;
  newMateria.save(err =>{
    if(err){
      res.status(500).json({ message: err });
    }
    res.status(200).json(newMateria);
  });
};

// Retrieve and return all materias from the database.
exports.findAll = (req, res) => {
  Materia
  .find()
  .then(materias => {
    res.status(200).json(materias);
  })
  .catch(err => {
    res.status(404).json({ message: "Error al recibir las materias" });
  });
};

// Find a single materia with a materiaId
exports.findOne = (req, res) => {
  Materia.findById(req.params.materiaId)
     .then(materia => {
         if(!materia) {
             return res.status(404).json({
                 message: "Materia no encontrada " + req.params.materiaId
             });
         }
         res.status(200).json(materia);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).json({
                 message: "Materia no encontrada " + req.params.materiaId
             });
         }
         return res.status(500).json({
             message: "Error al intentar obtener materia " + req.params.materiaId
         });
     });
};

// Update a materia identified by the materiaId in the request
exports.update = (req, res) => {
  Materia
  .findByIdAndUpdate(req.params.materiaId, {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  },{new:true})
  .then(materia =>{
    if(!materia){
      return res.status(404).json({ message: "No hay materias cono ese ID"});
    }
    return res.status(200).json(materia);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay materias con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar materia" });
  });
};

// Delete a materia with the specified materiaId in the request
exports.delete = (req, res) => {
  Materia
  .findByIdAndRemove(req.params.materiaId)
  .then(materia =>{
    if(!materia){
      return res.status(404).json({ message: "No hay materias cono ese ID"});
    }
    return res.status(200).json({ message: "Materia eliminada correctamente" });
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay materias con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar materia" });
  });
};

// Delete a materia with the specified materiaId in the request
exports.deleteAll = (req, res) => {
  Materia
  .remove()
  .then(() =>{
    return res.status(200).json({ message: "Materias eliminadas correctamente" });
  }).catch(err => {
    return res.status(500).json({ message: "Error al eliminar materias" });
  });
};
