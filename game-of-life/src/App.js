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
        <h1><img src="https://i.pinimg.com/originals/7f/28/a6/7f28a62f49535a89cb394d4672bad4b5.png" alt="contra boss"/>The Game of Life<img src="https://i.pinimg.com/originals/7f/28/a6/7f28a62f49535a89cb394d4672bad4b5.png" alt="contra boss"/></h1>
      </header>
      <Grid />
      <section><img src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248" alt="contra guy"/><img src={logo} className="App-logo" alt="react logo" /><img src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248" alt="contra guy"/></section>
      
    </div>
    <Footer/>
    </Fragment>
  );
}

export default App;
