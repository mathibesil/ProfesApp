module.exports = (app) => {
    var Users = require('../controllers/user.controller.js');
	  var Middelware = require('../middleware/user.middleware.js');

    // Create a new User
    app.post('/Users', Users.create);

    app.get('/Logout',Middelware.requiresLogin, Users.logout);

}
