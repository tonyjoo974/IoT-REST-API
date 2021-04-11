const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejsLint = require('ejs-lint');

const sensorRoutes = require('./api/routes/sensors');
const userRoutes = require('./api/routes/users');
//const hygroRoutes = require('./api/routes/hygrometer');
//const thermoRoutes = require('./api/routes/thermometer');
app.set('view engine', 'ejs');

// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb+srv://iotai:'+ process.env.MONGO_ATLAS_PW + '@iot-xmly1.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/mongodb', { useNewUrlParser: true, useCreateIndex: true });
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Middleware
// only requests to /sensors/* will be sent to our "sensorRoutes"
app.use('/sensors', sensorRoutes);
app.use('/users', userRoutes);
app.use(express.static('./static'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // forward this request error
    next(error);
});

// if error is thrown, do the following
app.use((error, req, res, next) => {
    // either give error code from above or 500 if any other case
    res.status(error.status || 500);
    res.json({
        error: {
          // error.message <- is a message property from error
          message: error.message
        }
    });
});
module.exports = app;
