module.exports = (app) => {
    var Years = require('../controllers/year.controller.js');
    var Middelware = require('../middleware/user.middleware.js');

    // Create a new Materia
    app.post('/Years', Middelware.requiresLogin, Years.create);

    // Retrieve all Years
    app.get('/Years', Middelware.requiresLogin, Years.findAll);

    // Retrieve a single Materia with yearId
    app.get('/Years/:yearId', Middelware.requiresLogin, Years.findOne);

    // Update a Materia with yearId
    app.put('/Years/:yearId', Middelware.requiresLogin, Years.update);

    // Delete a Materia with yearId
    app.delete('/Years/:yearId', Middelware.requiresLogin, Years.delete);

    // Delete all Years
    app.delete('/Years', Middelware.requiresLogin, Years.deleteAll);
}
