var express = require('express');
var app = express();
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser');

// app.use(express.static('public'));
// app.set('view engine', 'ejs');
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
let weaknessOutput = [];

function asyncRequestWeakness(val) {
  let subWeakness = [];

  request(val, function(error2, response2, body2) {
    if (!error2 && response2.statusCode == 200) {
      var damageOutPut = JSON.parse(body2);
      let weaknessVariable = damageOutPut.damage_relations.double_damage_from;

      for (let a = 0; a < weaknessVariable.length; a++) {
        subWeakness.push(weaknessVariable[a].name);
        // weaknessOutput.push(weaknessVariable[a].name);
        console.log('weaknessName', weaknessVariable[a].name);
        // return weaknessVariable[a].name;
      }
    }
    // console.log('layer02', weaknessOutput);
    console.log('subweakness', subWeakness);
    return subWeakness;
  });

  // console.log('layer03', weaknessOutput);
  // return weaknessOutput;

  // return subWeakness;
}

router.get('/', function(req, res) {
  var url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var outPut = JSON.parse(body);
      // console.log(body);

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

        // const makeWork = async() => {
        //   const a = await asyncRequestWeakness(urlWeak);
        // }

        // console.log('returned', asyncRequestWeakness(urlWeak));
        // let subWeaknessReturn = asyncRequestWeakness(urlWeak);
        // console.log('subweak01', subWeaknessReturn);

        // weaknessOutput.push(asyncRequestWeakness(urlWeak));

        // console.log('returns', weaknessOutput.push(asyncRequestWeakness(urlWeak)));
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

router.get('/name', function(req, res) {
  selectedPokemon = 'charizard';

  var url = 'https://pokeapi.co/api/v2/pokemon/' + selectedPokemon;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var outPut = JSON.parse(body);
      // console.log(body);

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

        // const makeWork = async() => {
        //   const a = await asyncRequestWeakness(urlWeak);
        // }

        // console.log('returned', asyncRequestWeakness(urlWeak));
        // let subWeaknessReturn = asyncRequestWeakness(urlWeak);
        // console.log('subweak01', subWeaknessReturn);

        // weaknessOutput.push(asyncRequestWeakness(urlWeak));

        // console.log('returns', weaknessOutput.push(asyncRequestWeakness(urlWeak)));
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

module.exports = router;
