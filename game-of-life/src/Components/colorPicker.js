// =============== IMPORTS ===============
import React from 'react';

// === Third Party ===
import { CirclePicker } from "react-color";


// =============== COMPONENT ============
function ColorPicker({ color, setColor }) {
    const handleChangeComplete = (color) => {
      setColor(color.hex);
    };
    
    // === Change Color Feature ===
    return <CirclePicker className="color-picker" color={color} onChangeComplete={handleChangeComplete} />;
  }
  
  export default ColorPicker;