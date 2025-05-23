import { useState } from "react";
import "./App.css";

type SudokuGrid = number[][];

const initialPuzzle: SudokuGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function App() {
  const [board, setBoard] = useState<SudokuGrid>(initialPuzzle);

  const handleChange = (row: number, col: number, value: string) => {
    const num = parseInt(value);
    const newBoard = board.map((r) => [...r]);

    if (!isNaN(num) && num >= 1 && num <= 9) {
      newBoard[row][col] = num;
    } else if (value === "") {
      newBoard[row][col] = 0;
    }

    setBoard(newBoard);
  };

  const isValid = (): boolean => {
    const isUnique = (arr: number[]) => {
      const nums = arr.filter(n => n !== 0);
      return new Set(nums).size === nums.length;
    };

    for (let i = 0; i < 9; i++) {
      const row = board[i];
      const col = board.map(r => r[i]);

      const box = [];
      const boxRow = Math.floor(i / 3) * 3;
      const boxCol = (i % 3) * 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          box.push(board[boxRow + r][boxCol + c]);
        }
      }

      if (!isUnique(row) || !isUnique(col) || !isUnique(box)) return false;
    }

    return true;
  };

  return (
    <div className="container">
      <h1>Sudoku Game</h1>
      <div className="grid">
        {board.map((row, i) =>
          row.map((cell, j) => {
            const isPrefilled = initialPuzzle[i][j] !== 0;
            return (
              <input
                key={`${i}-${j}`}
                type="text"
                maxLength={1}
                value={cell === 0 ? "" : cell}
                className={`cell ${isPrefilled ? "prefilled" : ""}`}
                onChange={(e) => handleChange(i, j, e.target.value)}
                disabled={isPrefilled}
              />
            );
          })
        )}
      </div>
      <button onClick={() => alert(isValid() ? "✅ Board is valid!" : "❌ Invalid entries found!")}>
        Check
      </button>
    </div>
  );
}

export default App;
