var express = require('express');
var app = express();
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
let weaknessOutput = [];

router.get('/', function(req, res) {
  var url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var outPut = JSON.parse(body);

      const typesOutput = [];
      const weaknessUrlOutput = [];

      let base_statAllOutput = 0;

      for (let i = 0; i < outPut.stats.length; i++) {
        base_statAllOutput += outPut.stats[i].base_stat;
      }

      for (let i = 0; i < outPut.types.length; i++) {
        typesOutput.push(outPut.types[i].type.name);
        let urlWeak = outPut.types[i].type.url;
        weaknessUrlOutput.push(urlWeak);
      }

      const pokemon = {
        name: outPut.name,
        stats: outPut.stats,
        types: typesOutput,
        sprites: outPut.sprites.front_default,
        weakUrl: weaknessUrlOutput,
        // weakness: weaknessOutput,
        statsAll: base_statAllOutput
      };

      console.log(pokemon);

      res.send(pokemon);
    }
  });
});

router.post('/name', function(req, res) {
  const selectedPokemon = req.body.pokemonVal;
  console.log('OPTIONS', selectedPokemon);

  var url = 'https://pokeapi.co/api/v2/pokemon/' + selectedPokemon;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var outPut = JSON.parse(body);

      const typesOutput = [];
      const weaknessUrlOutput = [];

      let base_statAllOutput = 0;

      for (let i = 0; i < outPut.stats.length; i++) {
        base_statAllOutput += outPut.stats[i].base_stat;
      }

      for (let i = 0; i < outPut.types.length; i++) {
        typesOutput.push(outPut.types[i].type.name);
        let urlWeak = outPut.types[i].type.url;
        weaknessUrlOutput.push(urlWeak);
      }

      const pokemon = {
        name: outPut.name,
        stats: outPut.stats,
        types: typesOutput,
        sprites: outPut.sprites.front_default,
        weakUrl: weaknessUrlOutput,
        statsAll: base_statAllOutput
      };

      console.log(pokemon);

      res.send(pokemon);
    }
  });
});

router.post('/type', function(req, res) {
  let received = req.body.data;
  console.log('received', received);

  request(received, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var outPut = JSON.parse(body);
      let weaknessVariable = outPut.damage_relations.double_damage_from;
      console.log('weakness', weaknessVariable);
      res.send(weaknessVariable);
    }
  });
});

module.exports = router;
