import React, { useEffect, useState } from "react";
import "./Grid.css";

const Grid = ({ rows = 15, cols = 20 }) => {
  const [grid, setGrid] = useState([]);

  const getRandomColor = () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const lightenColor = (hex, percent) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.min(255, r + (255 - r) * percent);
    g = Math.min(255, g + (255 - g) * percent);
    b = Math.min(255, b + (255 - b) * percent);

    return `#${(1 << 24) + (r << 16) + (g << 8) + b}.toString(16).slice(1)}`;
  };

  const createGrid = () => {
    let newGrid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ id: `${i}-${j}`, active: false, color: "#333", opacity: 1 });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const animateRain = () => {
    const updatedGrid = [...grid];
    for (let col = 0; col < cols; col++) {
      let delay = Math.floor(Math.random() * 1000); 
      let dropColor = getRandomColor();

      setTimeout(() => {
        let row = 0;
        const intervalId = setInterval(() => {
          if (row > 0) {
            updatedGrid[row - 1][col].active = false;
            updatedGrid[row - 1][col].opacity = 1;
          }
          if (row > 1) {
            updatedGrid[row - 2][col].opacity = 0.6;
            updatedGrid[row - 2][col].color = lightenColor(dropColor, 0.3); 
          }
          if (row > 2) {
            updatedGrid[row - 3][col].opacity = 0.3;
            updatedGrid[row - 3][col].color = lightenColor(dropColor, 0.5); 
          }
          if (row > 3) {
            updatedGrid[row - 4][col].active = false; 
            updatedGrid[row - 4][col].opacity = 1;
          }

          if (row < rows) {
            updatedGrid[row][col].active = true;
            updatedGrid[row][col].color = dropColor; 
            updatedGrid[row][col].opacity = 1; 
            setGrid([...updatedGrid]);
            row++;
          } else {
            clearInterval(intervalId); 
          }
        }, 100);
      }, delay);
    }
  };

  useEffect(() => {
    createGrid();
  }, [rows, cols]);

  useEffect(() => {
    const rainInterval = setInterval(animateRain, 500); 
    return () => clearInterval(rainInterval);
  }, [grid]);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell) => (
          <div
            key={cell.id}
            className="cell"
            style={{
              backgroundColor: cell.active ? cell.color : "#333",
              opacity: cell.opacity,
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;
