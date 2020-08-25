import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><img src="https://i.pinimg.com/originals/7f/28/a6/7f28a62f49535a89cb394d4672bad4b5.png"/>The Game of Life<img src="https://i.pinimg.com/originals/7f/28/a6/7f28a62f49535a89cb394d4672bad4b5.png"/></h1>
      </header>
      <footer><img src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248"/><img src={logo} className="App-logo" alt="logo" /><img src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248"/></footer>
    </div>
  );
}

export default App;
