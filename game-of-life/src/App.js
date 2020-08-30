// =============== IMPORTS ===============
import React, { useState, useCallback, useRef, Fragment } from 'react';
import logo from './logo.svg';

import produce from 'immer';
import ColorPicker from './Components/colorPicker';

import Header from './Components/Header';
import Grid from './Components/Grid';
import Buttons from './Components/Buttons'
import Footer from './Components/Footer';
import './App.css';


// =============== VARIABLES ===============
const numRows = 26;
const numColumns = 40;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]


// =============== FUNCTIONS ===============
const generateEmptyGrid = () => {
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numColumns).fill(0)))
  }

  return rows
}


// =============== APP ===============
function App() {

  // ===== Storing state =====
  const [color, setColor] = useState('black');
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  })

  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numColumns; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numColumns) {
                neighbors += g[newI][newJ]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      })
    })
    setTimeout(runSimulation, speed)
  }, [speed])

  return (
    <Fragment>
      <div className="App">
        <Header />
        <main>
          <section>
            <h3>Rules</h3>
            <p>1. Any live cell with fewer than 2 live neighbors dies, as if by underpopulation.</p>
            <p>2. Any live cell with 2 or 3 live neighbors lives on to the next generation.</p>
            <p>3. Any live cell with more than 3 live neighbors dies, as if by overpopulation.</p>
            <p>4. Any dead cell with exactly 3 live neighbors becomes a live cell, as if by reproduction.</p>
            <img className="contra-guy img-flipped" src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248" alt="contra guy" />
          </section>
          <Grid
            grid={grid}
            numColumns={numColumns}
            setGrid={setGrid}
            color={color}
            produce={produce}
          />
          <section>
            <h3>About</h3>
            <p className="about-description">The Game of Life is a cellular automation created by John Horton Conway in 1970. Although it is called a game, it actually has zero players. The player only participates in setting the initial state, and the evolution of the patterns begins moving forward. The general setup is a grid with cells showing as 'alive' or 'dead'.</p>
            <img className="contra-guy" src="https://vignette.wikia.nocookie.net/contra/images/b/ba/BillRizerRuns.gif/revision/latest?cb=20171207035248" alt="contra guy" />
          </section>
        </main>
        <Buttons
          running={running}
          setRunning={setRunning}
          runningRef={runningRef}
          runSimulation={runSimulation}
          setGrid={setGrid}
          generateEmptyGrid={generateEmptyGrid}
          numRows={numRows}
          numColumns={numColumns}
          setSpeed={setSpeed}
        />
        <div>
          <ColorPicker color={color} setColor={setColor} />
        </div>
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
