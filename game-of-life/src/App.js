// =============== IMPORTS ===============
import React, { Fragment } from 'react';
import logo from './logo.svg';

import Grid from './Components/Grid';
import Footer from './Components/Footer';
import './App.css';


// =============== VARIABLES ===============



// =============== APP ===============
function App() {


  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <h1><img src="https://i.pinimg.com/originals/7f/28/a6/7f28a62f49535a89cb394d4672bad4b5.png" alt="contra boss" />The Game of Life<img className="img-flipped" src="https://i.pinimg.com/originals/7f/28/a6/7f28a62f49535a89cb394d4672bad4b5.png" alt="contra boss" /></h1>
        </header>
        <main>
          <section>
            <h3>Rules</h3>
            <p>1. Any live cell with fewer than 2 live neighbors dies, as if by underpopulation.</p>
            <p>2. Any live cell with 2 or 3 live neighbors lives on to the next generation.</p>
            <p>3. Any live cell with more than 3 live neighbors dies, as if by overpopulation.</p>
            <p>4. Any dead cell with exactly 3 live neighbors becomes a live cell, as if by reproduction.</p>
            <img className="contra-guy img-flipped" src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248" alt="contra guy" />
          </section>
          <Grid />
          <section>
            <h3>About</h3>
            <p className="about-description">The Game of Life is a cellular automation created by John Horton Conway in 1970. Although it is called a game, it actually has zero players. The player only participates in setting the initial state, and the evolution of the patterns begins moving forward. The general setup is a grid with cells showing as 'alive' or 'dead'.</p>
            <img className="contra-guy" src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248" alt="contra guy" />
          </section>
        </main>

        <div className="gifs-container">
          <img src={logo} className="App-logo" alt="react logo" />
        </div>
        <h2>Life Finds A Way</h2>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
