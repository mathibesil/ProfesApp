exports.requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('Acceso denegado, no tiene permisos para realizar esta acción.');
    err.status = 401;
    return next(err);
  }
};
