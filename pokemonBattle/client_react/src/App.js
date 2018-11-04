import React, { Component } from 'react';
// import Stats from 'stats.js';
// import logo from './logo.svg';
import Battle from './Battle';

import { Grid, Row, Col } from 'react-bootstrap';

// import Pokemon1 from './Pokemon1';
// import Pokemon2 from './Pokemon2';

import './App.css';

class App extends Component {
  render() {
    const pStyle = {
      width: '30%'
    };
    return (
      <div className="App">
        <Grid>
          <Row>
            <Battle />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
