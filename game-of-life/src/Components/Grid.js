// =============== IMPORTS ===============
import React from 'react';


// =============== VARIABLES ===============

// =============== APP ============
function Grid({ grid, numColumns, setGrid, color, produce }) {

    return (
            <div className="grid-container">

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
                                    backgroundColor: grid[i][k] ? color : undefined,
                                }}>

                            </div>
                        )))}
                </div>

            </div>
    )
}

export default Grid;