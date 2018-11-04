import React, { Component } from 'react';
import Battle from './Battle';

const axios = require('axios');

class Pokemon2 extends Component {
  state = { pokemon: [], select: 'bulbasaur' };

  componentDidMount() {
    // fetch('/pokemon')
    fetch('/pokemon')
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon }));
  }

  _handleChange = event => {
    this.setState({ select: event.target.value });
    let sendingServer = event.target.value;
    // console.log(event.target.value);
    console.log('sendingSERVER', sendingServer);

    // fetch('http://localhost:3001/pokemon/name')
    //   .then(res => res.json())
    //   .then(pokemon => this.setState({ pokemon }));

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

  render() {
    const { pokemon } = this.state;
    console.log(this.state.pokemon);

    let adoptItems = '';

    if (pokemon.types instanceof Array) {
      adoptItems = pokemon.types.map(type => <p key={type}> {type} </p>);
    }

    return (
      <div className="navbar-right">
        <div>
          <Battle />
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
    );
  }
}

export default Pokemon2;
