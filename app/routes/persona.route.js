module.exports = (app) => {
    var Personas = require('../controllers/persona.controller.js');
    var Middelware = require('../middleware/user.middleware.js');

    // Create a new Persona
    app.post('/Personas', Middelware.requiresLogin, Personas.create);

    // Retrieve all Personas
    app.get('/Personas', Middelware.requiresLogin, Personas.findAll);

    // Retrieve a single Persona with personaId
    app.get('/Personas/:personaId', Middelware.requiresLogin, Personas.findOne);

    // Update a Persona with personaId
    app.put('/Personas/:personaId', Middelware.requiresLogin, Personas.update);

    // Delete a Persona with personaId
    app.delete('/Personas/:personaId', Middelware.requiresLogin, Personas.delete);

    // Delete all Personas
    app.delete('/Personas', Middelware.requiresLogin, Personas.deleteAll);
}
