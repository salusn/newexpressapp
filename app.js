// jshint ignore: start
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Newtable = require('./models/newtable');

mongoose.Promise = Promise;

// mongodb connection
mongoose.connect("mongodb://localhost:27017/Newtable", {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

var db = mongoose.connection;
// mongodb error
db.on('error', console.error.bind(console, 'connection error:'));
// mongodb connection open
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`)
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log("connected")
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


app.use('/api', router);
//app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
