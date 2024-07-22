import React, { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  // Generate the board dynamically
  let board = [];
  const size = 6; // Board size (6x6)
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      let index = i * size + j;
      row.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        />
      );
    }
    board.push(<div key={i} className="board-row">{row}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(36).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const size = 6; // Board size (10x10)
  const lines = [];
  
  // Generate horizontal lines
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - 3; j++) {
      lines.push(Array.from({ length: 3 }, (_, k) => i * size + j + k));
    }
  }
  
  // Generate vertical lines
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - 3; j++) {
      lines.push(Array.from({ length: 3 }, (_, k) => (j + k) * size + i));
    }
  }
  
  // Generate diagonal (top-left to bottom-right) lines
  for (let i = 0; i <= size - 3; i++) {
    for (let j = 0; j <= size - 3; j++) {
      lines.push(Array.from({ length: 3 }, (_, k) => (i + k) * size + j + k));
    }
  }
  
  // Generate diagonal (top-right to bottom-left) lines
  for (let i = 0; i <= size - 3; i++) {
    for (let j = size - 1; j >= 3; j--) {
      lines.push(Array.from({ length: 3 }, (_, k) => (i + k) * size + j - k));
    }
  }
  
  // Check for a winner
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  
  return null;
}
