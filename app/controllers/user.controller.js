var User = require('../models/user.model.js');
var Session = require('../models/sessions.model.js');

exports.create = (req, res, next) => {
  if (req.body.email &&
    req.body.password &&
    req.body.passwordConf) {
      // confirm that user typed same password twice
      if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Las contraseñas no coninciden');
        err.status = 500;
        return next(err);
      }
      User
        .findOne({ 'email': req.body.email })
        .exec((err, userData) => {
          if (userData) {
            var err = new Error('El usuario ya existe');
            err.status = 500;
            return next(err);
          }

    var userData = {
      email: req.body.email,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {

        return res.status(200).json(user);
      }
    });
});
  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Verifique email o contraseña.');
        err.status = 500;
        return next(err);
      } else {
        req.session.userId = user._id;
        logoutId(req, res, next);
        return res.status(200).json(user);
      }
    });
  } else {
    var err = new Error('Todos los campos son requeridos.');
    err.status = 500;
    return next(err);
  }

};

exports.logout = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        err.status(500);
        return next(err);
      } else {
        return res.status(200).json({ message: "Sesión finalizada correctamente. "});
      }
    });
  }
};

var logoutId = (req, res, next) => {
  if(req.session){
    Session
      .remove({ session: { $regex: '.*' + req.session.userId + '.*' }, _id: {$ne: req.session.id}})
      .then(materias =>{
        next();
    })
    .catch(err => {
      next();
    });
  }
};
