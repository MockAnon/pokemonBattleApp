import React, { Component } from 'react';

class Types extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1> Compare Types </h1>
          <p>
            {' '}
            {this.props.pokemon} vs {this.props.pokemon2}{' '}
          </p>
          <p> {/* {this.props.pokemonWeak} // {this.props.pokemon2Weak}{' '} */}</p>
        </div>
      </div>
    );
  }
}

export default Types;
