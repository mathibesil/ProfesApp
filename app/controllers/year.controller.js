var Year = require('../models/year.model.js');

// Create and Save a new year
exports.create = (req, res) => {
  let newYear = new Year();
  newYear.nombre = req.body.nombre;
  newYear.descripcion = req.body.descripcion;

  newYear.save(err =>{
    if(err){
      res.status(500).json({ message: err });
    }
    res.status(200).json(newYear);
  });
};

// Retrieve and return all years from the database.
exports.findAll = (req, res) => {
  Year
  .find()
  .then(years => {
    res.status(200).json(years);
  })
  .catch(err => {
    res.status(404).json({ message: "Error al recibir las years" });
  });
};

// Find a single year with a yearId
exports.findOne = (req, res) => {
  Year.findById(req.params.yearId)
     .then(year => {
         if(!year) {
             return res.status(404).json({
                 message: "Year no encontrada " + req.params.yearId
             });
         }
         res.status(200).json(year);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).json({
                 message: "Year no encontrada " + req.params.yearId
             });
         }
         return res.status(500).json({
             message: "Error al intentar obtener year " + req.params.yearId
         });
     });
};

// Update a year identified by the yearId in the request
exports.update = (req, res) => {
  Year
  .findByIdAndUpdate(req.params.yearId, {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  },{new:true})
  .then(year =>{
    if(!year){
      return res.status(404).json({ message: "No hay years cono ese ID"});
    }
    return res.status(200).json(year);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay years con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar year" });
  });
};

// Delete a year with the specified yearId in the request
exports.delete = (req, res) => {
  Year
  .findByIdAndRemove(req.params.yearId)
  .then(year =>{
    if(!year){
      return res.status(404).json({ message: "No hay years cono ese ID"});
    }
    return res.status(200).json({ message: "Year eliminada correctamente" });
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ message: "No hay years con ese ID"});
    }
    return res.status(500).json({ message: "Error al actualizar year" });
  });
};

// Delete a year with the specified yearId in the request
exports.deleteAll = (req, res) => {
  Year
  .remove()
  .then(() =>{
    return res.status(200).json({ message: "Years eliminadas correctamente" });
  }).catch(err => {
    return res.status(500).json({ message: "Error al eliminar years" });
  });
};
