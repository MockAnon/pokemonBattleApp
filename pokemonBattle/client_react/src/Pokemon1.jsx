import React, { Component } from 'react';
import Battle from './Battle';

const axios = require('axios');

class Pokemon1 extends Component {
  state = { pokemon: [], pokemon2: [], select: 'bulbasaur' };

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
    console.log('sendingSERVER', sendingServer);

    var self = this;
    axios
      .post(`http://localhost:3001/pokemon/name`, { pokemonVal: sendingServer })
      .then(function(response) {
        console.log(response.data);
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
    console.log('sendingSERVER', sendingServer);

    var self = this;
    axios
      .post(`http://localhost:3001/pokemon/name`, { pokemonVal: sendingServer })
      .then(function(response) {
        console.log(response.data);
        self.setState({ pokemon2: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { pokemon } = this.state;
    const { pokemon2 } = this.state;
    console.log(this.state.pokemon);

    let adoptItems = '';
    let pokemonType2 = '';

    if (pokemon.types instanceof Array) {
      adoptItems = pokemon.types.map(type => <p key={type}> {type} </p>);
    }

    if (pokemon2.types instanceof Array) {
      pokemonType2 = pokemon2.types.map(type => <p key={type}> {type} </p>);
    }

    return (
      <div className="navbar-right">
        <div className="poke01">
          <div>
            <p> pokemon 1 reload </p>
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
            <ul>{adoptItems}</ul>
          </div>
        </div>
        <div className="poke02">
          <div>
            <p> pokemon 2 reload </p>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon1;
