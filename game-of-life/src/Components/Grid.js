// =============== IMPORTS ===============
import React, { useState } from 'react';
import produce from 'immer'

// =============== VARIABLES ===============
const numRows = 25;
const numColumns = 25;


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

    return (
        <div className="grid" style={{display: "grid", gridTemplateColumns: `repeat(${numColumns}, 20px)`}}>
            {grid.map((rows, i) => 
                rows.map((col, k) => (
                    <div className="grid-cells" key={`${i}-${k}`} onClick={() => {
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                        });
                        setGrid(newGrid);
                    }} 
                    >

                    </div>
                )))}
        </div>
    )
}


export default Grid;