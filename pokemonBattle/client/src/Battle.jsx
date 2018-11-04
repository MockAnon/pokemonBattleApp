import React, { Component } from 'react';
import Types from './Types';

const axios = require('axios');

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      pokemonWeak: [],
      pokemonWeakPure: [],
      pokemon2: [],
      select: 'bulbasaur'
    };
  }

  // state = { pokemon: [], pokemonWeak: [], pokemon2: [], pokemon1Weak: [], select: 'bulbasaur' };
  // constructor(props) {

  componentDidMount() {
    // fetch('/pokemon')
    fetch('/pokemon')
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon }));

    fetch('/pokemon')
      .then(res => res.json())
      .then(pokemon2 => this.setState({ pokemon2 }));
  }

  //pokemon 01
  _handleChange = event => {
    this.setState({ select: event.target.value });
    let sendingServer = event.target.value;
    // console.log('sendingSERVER', sendingServer);

    var self = this;
    axios
      .post(`http://localhost:3001/pokemon/name`, { pokemonVal: sendingServer })
      .then(function(response) {
        // console.log(response.data);
        self.setState({ pokemon: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  //pokemon02
  _handleChange2 = event => {
    this.setState({ select: event.target.value });
    let sendingServer = event.target.value;
    // console.log('sendingSERVER', sendingServer);

    var self = this;
    axios
      .post(`http://localhost:3001/pokemon/name`, { pokemonVal: sendingServer })
      .then(function(response) {
        // console.log(response.data);
        self.setState({ pokemon2: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  _handleBattle = event => {
    //   console.log('button');
    // };
    // this.setState({ select: event.target.value });
    let pokemonUrlList = this.state.pokemon.weakUrl;
    let pokemon2UrlList = this.state.pokemon2.weakUrl;

    var self = this;

    self.setState({ pokemonWeak: [] });
    self.setState({ pokemon2Weak: [] });

    pokemonUrlList.forEach(function(value) {
      // console.log(value);

      axios
        .post(`http://localhost:3001/pokemon/type`, { data: value })
        .then(function(response) {
          let newelement = [...self.state.pokemonWeak, response.data];
          // console.log('response', newelement);
          self.setState({ pokemonWeak: newelement });
          // console.log('state', self.state.pokemonWeak);
        })
        .catch(function(error) {
          console.log(error);
        });
    });

    pokemon2UrlList.forEach(function(value) {
      // console.log('pokemon2Val', value);

      axios
        .post(`http://localhost:3001/pokemon/type`, { data: value })
        .then(function(response) {
          let newelement = [...self.state.pokemon2Weak, response.data];
          // console.log('response-Pokemon2', newelement);
          self.setState({ pokemon2Weak: newelement });
          // console.log('state-Pokemon2', self.state.pokemon2Weak);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  };

  render() {
    const { pokemon, pokemon2, pokemonWeak, pokemon2Weak } = this.state;

    // console.log(this.state.pokemon);

    let pokemonType = '';
    let pokemonType2 = '';

    if (pokemon.types instanceof Array) {
      pokemonType = pokemon.types.map(type => <p key={type}> {type} </p>);
    }

    if (pokemon2.types instanceof Array) {
      pokemonType2 = pokemon2.types.map(type => <p key={type}> {type} </p>);
    }

    //    battle stats

    let statsOutcome = '';

    if (pokemon.statsAll > pokemon2.statsAll) {
      statsOutcome = 'Player Ones ' + pokemon.name + ' has stronger stats';
    }

    if (pokemon.statsAll < pokemon2.statsAll) {
      console.log(pokemon2.name + ' is stronger');
      statsOutcome = 'Player Twos ' + pokemon2.name + ' has stronger stats';
    }

    if (pokemon.statsAll === pokemon2.statsAll) {
      statsOutcome = 'Player Ones ' + pokemon.name + ' has the same stats as Player Twos ' + pokemon2.name;
    }
    //            run through stat advantages between two pokemon
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

    //          run through all weaknesses of pokemon vs types of pokemon2
    let pokemonWeakOut = '';
    let pokemon2WeakOut = '';

    if (pokemonWeaknessRender instanceof Array) {
      for (let i = 0; i < pokemonWeaknessRender.length; i++) {
        for (let b = 0; b < pokemon2.types.length; b++) {
          if (pokemonWeaknessRender[i].includes(pokemon2.types[b]) === true) {
            pokemonWeakOut = 'Player Ones ' + pokemon.name + ' is weak against ' + pokemon2.name + 's ' + pokemon2.types[b] + ' attribute';
          }
        }
      }
    }

    if (pokemon2WeaknessRender instanceof Array) {
      for (let i = 0; i < pokemon2WeaknessRender.length; i++) {
        for (let b = 0; b < pokemon.types.length; b++) {
          if (pokemon2WeaknessRender[i].includes(pokemon.types[b]) === true) {
            pokemon2WeakOut = 'Player Twos ' + pokemon2.name + ' is weak against ' + pokemon.name + 's ' + pokemon.types[b] + ' attribute';
          }
        }
      }
    }

    return (
      <div>
        <div className="battleBox">
          <p>{pokemonWeakOut}</p>
          <p>{pokemon2WeakOut}</p>
          <p>{statsOutcome}</p>
          <button onClick={this._handleBattle}> BATTLE! </button>
        </div>
        {/* <Types pokemon={pokemon.types} pokemonWeak={this.state.pokemonWeak} pokemon2Weak={this.state.pokemon2Weak} pokemon2={pokemon2.types} /> */}
        <div className="battle" />
        <div className="poke01">
          <div>
            <select defaultValue={this.state.value} onChange={this._handleChange}>
              <option value="bulbasaur">bulbasaur</option>
              <option value="charizard">charizard</option>
              <option value="charmander">charmander</option>
              <option value="blastoise">blastoise</option>
            </select>
          </div>
          <img src={this.state.pokemon.sprites} alt="pokemon image" />
          <p> {this.state.pokemon.name} </p>
          <p> Stats Sum: {this.state.pokemon.statsAll} </p>
          <div>
            <p> type: </p>
            <ul>{pokemonType}</ul>
            <p>
              {this.state.pokemon.name}s weakness: {pokemonWeaknessRender}
            </p>
          </div>
        </div>
        <div className="poke02">
          <div>
            <select defaultValue={this.state.value} onChange={this._handleChange2}>
              <option value="bulbasaur">bulbasaur</option>
              <option value="charizard">charizard</option>
              <option value="charmander">charmander</option>
              <option value="blastoise">blastoise</option>
            </select>
          </div>
          <img src={this.state.pokemon2.sprites} alt="pokemon image" />
          <p> {this.state.pokemon2.name} </p>
          <p> Stats Sum: {this.state.pokemon2.statsAll} </p>
          <div>
            <p> type: </p>
            <ul>{pokemonType2}</ul>
            <p>
              {this.state.pokemon2.name}s weakness: {pokemon2WeaknessRender}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Battle;
