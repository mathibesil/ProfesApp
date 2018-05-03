module.exports = (app) => {
    var Tipos = require('../controllers/tipo.controller.js');
    var Middelware = require('../middleware/user.middleware.js');

    // Create a new Materia
    app.post('/Tipos', Middelware.requiresLogin, Tipos.create);

    // Retrieve all Tipos
    app.get('/Tipos', Middelware.requiresLogin, Tipos.findAll);

    // Retrieve a single Materia with tipoId
    app.get('/Tipos/:tipoId', Middelware.requiresLogin, Tipos.findOne);

    // Update a Materia with tipoId
    app.put('/Tipos/:tipoId', Middelware.requiresLogin, Tipos.update);

    // Delete a Materia with tipoId
    app.delete('/Tipos/:tipoId', Middelware.requiresLogin, Tipos.delete);

    // Delete all Tipos
    app.delete('/Tipos', Middelware.requiresLogin, Tipos.deleteAll);
}
