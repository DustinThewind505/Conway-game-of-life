// =============== IMPORTS ===============
import React from 'react';

// =============== COMPONENT ============
function buttons({
    setRunning,
    running,
    runningRef,
    runSimulation,
    setGrid,
    generateEmptyGrid,
    numRows,
    numColumns,
    setSpeed }) {

    return (
        <div className="buttons">
            <button className="start-button"
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        // Up To Date On/Off State Refrence
                        runningRef.current = true;
                        runSimulation();
                    }
                }}>
                {running ? 'Stop' : 'Start'}
            </button>
            <button
                onClick={() => {
                    setGrid(generateEmptyGrid())
                }}>
                Clear
            </button>
            {/* =============== Randomize Feature =============== */}
            <button
                onClick={() => {
                    const rows = [];
                    for (let i = 0; i < numRows; i++) {
                        rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.8 ? 1 : 0)))
                    }

                    setGrid(rows)
                }}>
                Random
            </button>
            {/* =============== Change Speed Feature =============== */}
            <button onClick={() => setSpeed(10)}>Fast</button>
            <button onClick={() => setSpeed(1500)}>Slow</button>
        </div>
    )
}

export default buttons;