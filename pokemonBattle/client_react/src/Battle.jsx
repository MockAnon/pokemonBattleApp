import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
const axios = require('axios');

//      Global

let pokemonBattleBoolean = false;
let pokemonWeaknessBoolean = false;
let pokemon2WeaknessBoolean = false;
let pokemonStrengthBoolean = false;

const pStyle = {
  padding: '1rem',
  outline: 'auto',
  marginTop: '1rem',
  marginBottom: '1rem',
  backgroundColor: '#f6f9ff'
};

//                              class starts here

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      pokemon2: [],
      pokemonWeak: [],
      pokemon2Weak: []
    };
  }

  //                mount the first pokemonat launch.
  componentDidMount() {
    fetch('http://localhost:3001/pokemon')
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon: pokemon }));

    fetch('http://localhost:3001/pokemon')
      .then(res => res.json())
      .then(pokemon2 => this.setState({ pokemon2: pokemon2 }));
  }

  //              pokemon 01 Selection Request
  _handleChange = event => {
    let sendingServer = event.target.value;

    pokemonBattleBoolean = false;
    pokemonWeaknessBoolean = false;
    pokemon2WeaknessBoolean = false;
    pokemonStrengthBoolean = false;

    var self = this;
    axios
      .post(`http://localhost:3001/pokemon/name`, { pokemonVal: sendingServer })
      .then(function(response) {
        self.setState({ pokemon: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  //              pokemon 01 Selection Request
  _handleChange2 = event => {
    let sendingServer = event.target.value;

    pokemonBattleBoolean = false;
    pokemonWeaknessBoolean = false;
    pokemon2WeaknessBoolean = false;
    pokemonStrengthBoolean = false;

    var self = this;
    axios
      .post(`http://localhost:3001/pokemon/name`, { pokemonVal: sendingServer })
      .then(function(response) {
        self.setState({ pokemon2: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  //          user pressed battle button!!!
  _handleBattle = event => {
    let pokemonUrlList = this.state.pokemon.weakUrl;
    let pokemon2UrlList = this.state.pokemon2.weakUrl;
    pokemonBattleBoolean = true;
    pokemonWeaknessBoolean = false;
    pokemon2WeaknessBoolean = false;
    pokemonStrengthBoolean = false;

    var self = this;

    self.setState({ pokemonWeak: [] });
    self.setState({ pokemon2Weak: [] });

    pokemonUrlList.forEach(function(value) {
      axios
        .post(`http://localhost:3001/pokemon/type`, { data: value })
        .then(function(response) {
          let newelement = [...self.state.pokemonWeak, response.data];
          self.setState({ pokemonWeak: newelement });
        })
        .catch(function(error) {
          console.log(error);
        });
    });

    pokemon2UrlList.forEach(function(value) {
      axios
        .post(`http://localhost:3001/pokemon/type`, { data: value })
        .then(function(response) {
          let newelement = [...self.state.pokemon2Weak, response.data];
          self.setState({ pokemon2Weak: newelement });
        })
        .catch(function(error) {
          console.log(error);
          // battleOutcome();
        });
    });
  };

  render() {
    const { pokemon, pokemon2, pokemonWeak, pokemon2Weak } = this.state;

    //                    final outcome
    let winner = '';

    function pokeWinner() {
      if (pokemonWeaknessBoolean === true && pokemon2WeaknessBoolean === false) {
        winner = 'Player 2 wins';
      }
      if (pokemonWeaknessBoolean === false && pokemon2WeaknessBoolean === true) {
        winner = 'Player 1 wins';
      }
      if ((pokemonWeaknessBoolean === false && pokemon2WeaknessBoolean === false) || (pokemonWeaknessBoolean === true && pokemon2WeaknessBoolean === true)) {
        if (pokemonStrengthBoolean === false) {
          winner = 'Player 1 wins';
        }
        if (pokemonStrengthBoolean === true) {
          winner = 'Player 2 wins';
        }
      }
    }

    //              print types
    let pokemonType = '';
    let pokemonType2 = '';

    if (pokemon.types instanceof Array) {
      pokemonType = pokemon.types.map(type => <p key={type}> {type} </p>);
    }

    if (pokemon2.types instanceof Array) {
      pokemonType2 = pokemon2.types.map(type => <p key={type}> {type} </p>);
    }

    //                battle stats

    let statsOutcome = '';

    if (pokemonBattleBoolean === true) {
      if (pokemon.statsAll > pokemon2.statsAll) {
        pokemonStrengthBoolean = false;
        statsOutcome = 'Player Ones ' + pokemon.name + ' has stronger stats';
        pokeWinner();
      }

      if (pokemon.statsAll < pokemon2.statsAll) {
        pokemonStrengthBoolean = true;
        statsOutcome = 'Player Twos ' + pokemon2.name + ' has stronger stats';
        pokeWinner();
      }

      if (pokemon.statsAll === pokemon2.statsAll) {
        pokemonStrengthBoolean = false;
        statsOutcome = 'Player Ones ' + pokemon.name + ' has the same stats as Player Twos ' + pokemon2.name;
        pokeWinner();
      }
    }
    //            clean up weakness data, placing it into a single array.
    let pokemon2WeaknessRender = [];
    let pokemonWeaknessRender = [];

    if (pokemonWeak instanceof Array) {
      for (let i = 0; i < pokemonWeak.length; i++) {
        for (let b = 0; b < pokemonWeak[i].length; b++) {
          pokemonWeaknessRender.push(pokemonWeak[i][b].name);
        }
      }
    }

    if (pokemon2Weak instanceof Array) {
      for (let i = 0; i < pokemon2Weak.length; i++) {
        for (let b = 0; b < pokemon2Weak[i].length; b++) {
          pokemon2WeaknessRender.push(pokemon2Weak[i][b].name);
        }
      }
    }

    //          run through all weaknesses of pokemon and pokemon2 monsters
    let pokemonWeakOut = '';
    let pokemonWeakRender = '';

    let pokemon2WeakOut = '';
    let pokemon2WeakRender = '';

    if (pokemonBattleBoolean === true) {
      if (pokemonWeaknessRender instanceof Array) {
        for (let i = 0; i < pokemonWeaknessRender.length; i++) {
          for (let b = 0; b < pokemon2.types.length; b++) {
            if (pokemonWeaknessRender[i].includes(pokemon2.types[b]) === true) {
              pokemonWeaknessBoolean = true;
              pokemonWeakOut = 'Player Ones ' + pokemon.name + ' is weak against ' + pokemon2.name + 's ' + pokemon2.types[b] + ' attribute';
              pokeWinner();
            }
          }
        }
      }

      if (pokemonWeaknessRender instanceof Array) {
        pokemonWeakRender = pokemonWeaknessRender.map(type => <p key={type}> {type} </p>);
      }

      if (pokemon2WeaknessRender instanceof Array) {
        for (let i = 0; i < pokemon2WeaknessRender.length; i++) {
          for (let b = 0; b < pokemon.types.length; b++) {
            if (pokemon2WeaknessRender[i].includes(pokemon.types[b]) === true) {
              pokemon2WeaknessBoolean = true;
              pokemon2WeakOut = 'Player Twos ' + pokemon2.name + ' is weak against ' + pokemon.name + 's ' + pokemon.types[b] + ' attribute';
              pokeWinner();
            }
          }
        }
      }
    }

    if (pokemon2WeaknessRender instanceof Array) {
      pokemon2WeakRender = pokemon2WeaknessRender.map(type => <p key={type}> {type} </p>);
    }

    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Col md={12}>
              <div className="battleBox">
                <button
                  style={{
                    backgroundColor: '#f35b5b',
                    borderRadius: '0.5rem',
                    padding: '0.8rem',
                    paddingTop: '0.3rem',
                    paddingBottom: '0.3rem'
                  }}
                  onClick={this._handleBattle}
                >
                  {' '}
                  BATTLE!{' '}
                </button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <div className="poke01" style={pStyle}>
                <div style={{ backgroundColor: '#ffffff', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <img src={this.state.pokemon.sprites} alt="Player 1 pokemon" />

                  <div>
                    <select defaultValue={this.state.value} onChange={this._handleChange}>
                      <option value="bulbasaur">bulbasaur</option>
                      <option value="ivysaur">ivysaur</option>
                      <option value="venusaur">venusaur</option>

                      <option value="charmander">charmander</option>
                      <option value="charmeleon">charmeleon</option>

                      <option value="squirtle">squirtle</option>
                      <option value="wartortle">wartortle</option>
                      <option value="blastoise">blastoise</option>

                      <option value="clefairy">clefairy</option>
                      <option value="clefable">clefable</option>
                      <option value="vulpix">vulpix</option>

                      <option value="ninetales">ninetales</option>

                      <option value="growlithe">growlithe</option>
                      <option value="arcanine">arcanine</option>

                      <option value="abra">abra</option>
                      <option value="kadabra">kadabra</option>
                      <option value="alakazam">alakazam</option>

                      <option value="machop">machop</option>
                      <option value="machoke">machoke</option>
                      <option value="machamp">machamp</option>

                      <option value="gastly">gastly</option>
                      <option value="haunter">haunter</option>
                      <option value="gengar">gengar</option>

                      <option value="chansey">chansey</option>
                      <option value="magikarp">magikarp</option>

                      <option value="eevee">eevee</option>
                      <option value="jolteon">jolteon</option>
                      <option value="vaporeon">vaporeon</option>
                      <option value="flareon">flareon</option>

                      <option value="porygon">porygon</option>
                    </select>
                  </div>
                </div>

                <p> Player Ones: {this.state.pokemon.name} </p>
                <p> Stats Sum: {this.state.pokemon.statsAll} </p>
                <div>
                  <p> Pokemon Type: </p>
                  <ul>{pokemonType}</ul>
                  <p> Weakness: </p>
                  <ul>{pokemonWeakRender}</ul>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <h1 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Pokemon Battle Simulator</h1>
              <div> Winner: {winner} </div>
              <div style={{ paddingTop: '0.5rem', marginTop: '1rem' }}>
                <p>{pokemonWeakOut}</p>
                <p>{pokemon2WeakOut}</p>
              </div>
              <div style={{ paddingTop: '0.5rem', marginTop: '1rem' }}>
                <p>{statsOutcome}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="poke02" style={pStyle}>
                <div style={{ backgroundColor: '#ffffff', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <img src={this.state.pokemon2.sprites} alt="Player 2 pokemon" />
                  <div>
                    <select defaultValue={this.state.value} onChange={this._handleChange2}>
                      <option value="bulbasaur">bulbasaur</option>
                      <option value="ivysaur">ivysaur</option>
                      <option value="venusaur">venusaur</option>

                      <option value="charmander">charmander</option>
                      <option value="charmeleon">charmeleon</option>

                      <option value="squirtle">squirtle</option>
                      <option value="wartortle">wartortle</option>
                      <option value="blastoise">blastoise</option>

                      <option value="clefairy">clefairy</option>
                      <option value="clefable">clefable</option>
                      <option value="vulpix">vulpix</option>

                      <option value="ninetales">ninetales</option>

                      <option value="growlithe">growlithe</option>
                      <option value="arcanine">arcanine</option>

                      <option value="abra">abra</option>
                      <option value="kadabra">kadabra</option>
                      <option value="alakazam">alakazam</option>

                      <option value="machop">machop</option>
                      <option value="machoke">machoke</option>
                      <option value="machamp">machamp</option>

                      <option value="gastly">gastly</option>
                      <option value="haunter">haunter</option>
                      <option value="gengar">gengar</option>

                      <option value="chansey">chansey</option>
                      <option value="magikarp">magikarp</option>

                      <option value="eevee">eevee</option>
                      <option value="jolteon">jolteon</option>
                      <option value="vaporeon">vaporeon</option>
                      <option value="flareon">flareon</option>

                      <option value="porygon">porygon</option>
                    </select>
                  </div>
                </div>

                <p> Player Twos: {this.state.pokemon2.name} </p>
                <p> Stats Sum: {this.state.pokemon2.statsAll} </p>
                <div>
                  <p> Pokemon Type: </p>
                  <ul>{pokemonType2}</ul>
                  <p> Weakness: </p>
                  <ul>{pokemon2WeakRender}</ul>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Battle;
