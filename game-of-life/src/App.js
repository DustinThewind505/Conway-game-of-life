// =============== IMPORTS ===============
import React, { useState, useCallback, useRef, Fragment } from 'react';
import logo from './logo.svg';

// === Third Party ===
import produce from 'immer'; //<-- Produces Copies for Mutability

// === Components ===
import Header from './Components/Header';
import Grid from './Components/Grid';
import Buttons from './Components/Buttons'
import Footer from './Components/Footer';
import ColorPicker from './Components/colorPicker';
import './App.css';


// =============== VARIABLES ===============

// Number of Rows and Columns in Grid
const numRows = 26;
const numColumns = 40;

// Defines Neighbours Around a Living Cell
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
// === Creates the Grid ===
const generateEmptyGrid = () => {
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numColumns).fill(0)))
  }

  return rows
}


// =============== APP ===============
function App() {

  // === Storing State ===
  // Change Color Feature
  const [color, setColor] = useState('black');
  // Change Speed Feature
  const [speed, setSpeed] = useState(100);

  // Change On/Off State
  const [running, setRunning] = useState(false);

  // Creates the Empty Grid 
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  })

  // Stores Up To Date Refrence to On/Off State
  const runningRef = useRef(running);
  runningRef.current = running

  // Makes Sure Function is Called Only When Needed
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // === Game Rules Logic ===
    setGrid((g) => {
      // Produce a New Grid Copy
      return produce(g, gridCopy => {

        // Nested For Loops to Search Entire Grid
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numColumns; j++) {
            let neighbors = 0;

            // Checking Bounderies for Neighbours
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numColumns) {
                neighbors += g[newI][newJ]
              }
            })
            // Changes Living Cell to Dead Cell
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            // Changes Dead Cell to Living Cell
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      })
    })
    // === Runs Simulation ===
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
