var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

// create express app
var app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Profes API"});
});

// Require Materias routes
require('./app/routes/materia.route.js')(app);
// Require Personas routes
require('./app/routes/persona.route.js')(app);
// Require Users routes
require('./app/routes/user.route.js')(app);
// Require Categrias routes
require('./app/routes/nivel.route.js')(app);
// Require Categrias routes
require('./app/routes/tipo.route.js')(app);
// Require Years routes
require('./app/routes/year.route.js')(app);

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: `${err.message}` });
});

// listen for requests process.env.PORT
app.listen(process.env.PORT || 33000, () => {
    console.log("Server is listening on port 33000");
});
