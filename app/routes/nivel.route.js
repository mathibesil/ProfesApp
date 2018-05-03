module.exports = (app) => {
    var Niveles = require('../controllers/nivel.controller.js');
    var Middelware = require('../middleware/user.middleware.js');

    // Create a new Materia
    app.post('/Niveles', Middelware.requiresLogin, Niveles.create);

    // Retrieve all Niveles
    app.get('/Niveles', Middelware.requiresLogin, Niveles.findAll);

    // Retrieve a single Materia with nivelId
    app.get('/Niveles/:nivelId', Middelware.requiresLogin, Niveles.findOne);

    // Update a Materia with nivelId
    app.put('/Niveles/:nivelId', Middelware.requiresLogin, Niveles.update);

    // Delete a Materia with nivelId
    app.delete('/Niveles/:nivelId', Middelware.requiresLogin, Niveles.delete);

    // Delete all Niveles
    app.delete('/Niveles', Middelware.requiresLogin, Niveles.deleteAll);
}
