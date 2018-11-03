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

router.get('/api/', function(req, res, next) {
  // res.send(1, 2, 3);
  res.send([{ id: 1, username: 'somebody' }, { id: 2, username: 'nobody' }]);
});

router.get('/name', function(req, res) {
  var url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
  request(url, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    // if (!err && resp.statusCode == 200) {
    // var outPut = JSON.parse(body);
    // console.log(body);
    // res.render('pokemon', { data: outPut });
    // }
  });
});

// app.get('/name/', function(req, res) {
//   var url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
//   request(url, function(error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
//     // if (!error && response.statusCode == 200) {
//     // console.log('body:', body);
//     // var outPut = JSON.parse(body);
//     // console.log(outPut);
//     // res.send(outPut);
//     // res.render('pokemon', { data: outPut });
//     // }
//   });
// });

module.exports = router;
