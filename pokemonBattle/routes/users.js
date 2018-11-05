var express = require('express');
var router = express.Router();

var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static('public'));
// app.set('view engine', 'ejs');
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.send([{ id: 1, username: 'somebody' }, { id: 2, username: 'nobody' }]);
});

module.exports = router;
