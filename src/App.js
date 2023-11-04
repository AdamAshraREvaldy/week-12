import React, { useState, useEffect } from 'react';
import './App.css';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  useEffect(() => {
    const currentWinner = calculateWinner(squares);

    if (currentWinner === 'X' && winner !== 'X') {
      setScoreX(scoreX + 1);
      setWinner('X');
    } else if (currentWinner === 'O' && winner !== 'O') {
      setScoreO(scoreO + 1);
      setWinner('O');
    }
  }, [squares, winner, scoreX, scoreO]);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
    setNextValue(nextValue === 'X' ? 'O' : 'X');
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Sekarang giliran player: ${nextValue}`;

  return (
    <div className="App">
      <div>{status}</div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart}>Restart</button>
      <div>
        <div>Player X: {scoreX}</div>
        <div>Player O: {scoreO}</div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function App() {
  return <Game />;
}

export default App;
