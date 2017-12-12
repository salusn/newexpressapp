// jshint ignore: start
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Newtable = require('./models/newtable');
var Ne = require('./models/ne');


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

router.route('/newtable')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
    
        var newtable = new Newtable({
        	name : req.body.name,        
            value : req.body.value
        	}); 

        newtable.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'created!' });
        });

    })

    // create a bear (accessed at POST http://localhost:8080/api/bears)
router.route('/n')    
    .post(function(req, res) {
    
        var ne = new Ne({
        	name : req.body.name,        
            value : req.body.value
        	}); 

        ne.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'created!' });
        });

    })

app.use('/api', router);
//app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
