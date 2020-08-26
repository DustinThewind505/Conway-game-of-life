// =============== IMPORTS ===============
import React, { useState, useCallback, useRef, Fragment } from 'react';
import produce from 'immer'

// =============== VARIABLES ===============
const numRows = 25;
const numColumns = 50;

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

const generateEmptyGrid = () => {
    const rows = [];

    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numColumns).fill(0)))
    }

    return rows
}

// =============== APP ============
function Grid() {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    })

    const [running, setRunning] = useState(false)

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
        setTimeout(runSimulation, 200)
    }, [])

    return (
        <Fragment>

            <div className="grid" style={{ display: "grid", gridTemplateColumns: `repeat(${numColumns}, 20px)` }}>
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div className="grid-cells" key={`${i}-${k}`} onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][k] = grid[i][k] ? 0 : 1;
                            });
                            setGrid(newGrid);
                        }}
                            style={{
                                backgroundColor: grid[i][k] ? "yellow" : undefined,
                            }}>

                        </div>
                    )))}
            </div>
            <div className="buttons">
                <button className="start-button"
                    onClick={() => {
                        setRunning(!running);
                        if (!running) {
                            runningRef.current = true;
                            runSimulation();
                        }
                    }}>
                    {running ? 'Stop' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        const rows = [];
                        for (let i = 0; i < numRows; i++) {
                            rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.8 ? 1: 0)))
                        }
                        
                        setGrid(rows)
                    }}>
                    Random
                </button>
                <button
                    onClick={() => {
                        setGrid(generateEmptyGrid())
                    }}>
                    Clear
                </button>
            </div>
        </Fragment>
    )
}

export default Grid;