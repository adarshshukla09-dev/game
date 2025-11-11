import React, { useState } from "react";
import toast from "react-hot-toast";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currPlayer, setCurrPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [history, setHistory] = useState([]);

  // --- Winning Rules ---
  const rules = (board) => {
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
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        toast.success(`${board[a]} wins! 🎉`);
        return board[a];
      }
    }
    return null;
  };

  // --- Handle a Move ---
  const check = (idx) => {
    if (gameOver) {
      toast("Game is already over!");
      return;
    }
    if (board[idx] !== "") {
      toast.error("Wrong choice!");
      return;
    }

    const newBoard = [...board];
    newBoard[idx] = currPlayer;

    // Save history for undo
    setHistory([...history, board]);

    const winner = rules(newBoard);
    setBoard(newBoard);

    if (winner) {
      setGameOver(true);
      setStatus(`${winner} Wins!`);
    } else if (!newBoard.includes("")) {
      setGameOver(true);
      setStatus("Draw!");
      toast("It's a draw!");
    } else {
      const nextPlayer = currPlayer === "X" ? "O" : "X";
      setCurrPlayer(nextPlayer);
      setStatus(`Turn: ${nextPlayer}`);
    }
  };

  // --- New Game ---
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrPlayer("X");
    setGameOver(false);
    setStatus("Ready");
    setHistory([]);
  };

  // --- Undo Move ---
  const undoMove = () => {
    if (history.length === 0) {
      toast.error("No moves to undo!");
      return;
    }
    const lastBoard = history[history.length - 1];
    setBoard(lastBoard);
    setHistory(history.slice(0, -1));
    setCurrPlayer(currPlayer === "X" ? "O" : "X");
    setGameOver(false);
    setStatus(`Turn: ${currPlayer}`);
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #0f1724;
          --card: #0b1220;
          --accent: #60a5fa;
          --muted: #94a3b8;
          --white: #f8fafc;
          --glass: rgba(255,255,255,0.04);
        }
        .ttt-root {
          font-family: Inter, system-ui;
          color: var(--white);
          background: linear-gradient(180deg, #071025 0%, #071224 100%);
          padding: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .ttt-header { text-align: center; margin-bottom: 18px; }
        .ttt-title { font-size: 28px; margin: 0 0 6px 0; }
        .ttt-sub { color: var(--muted); font-size: 13px; }
        .ttt-board-area {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
          border-radius: 12px;
          padding: 20px;
          width: 380px;
          box-shadow: 0 6px 20px rgba(2,6,23,0.6);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ttt-info { display: flex; justify-content: space-between; align-items: center; }
        .ttt-turn, .ttt-status { font-size: 13px; color: var(--muted); }
        .ttt-turn-player { color: var(--accent); font-weight: 600; margin-left: 6px; }
        .ttt-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.03));
          border-radius: 8px;
        }
        .ttt-square {
          background: var(--glass);
          border: 1px solid rgba(255,255,255,0.04);
          height: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
          user-select: none;
        }
        .ttt-square:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(2,6,23,0.6);
        }
        .ttt-mark {
          font-size: 48px;
          font-weight: 700;
          color: var(--white);
          width: 64px;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ttt-mark--x { color: #f97316; }
        .ttt-mark--o { color: #60a5fa; }
        .ttt-controls { display: flex; gap: 10px; justify-content: center; }
        .ttt-btn {
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          color: var(--white);
          cursor: pointer;
        }
        .ttt-btn-primary {
          background: linear-gradient(90deg, rgba(96,165,250,0.12), rgba(96,165,250,0.06));
          border: 1px solid rgba(96,165,250,0.18);
        }
        .ttt-footer { margin-top: 12px; text-align: center; color: var(--muted); font-size: 12px; }
        @media (max-width:420px) {
          .ttt-board-area { width: 100%; padding: 14px; }
          .ttt-square { height: 78px; }
          .ttt-mark { font-size: 40px; }
        }
      `}</style>

      <div className="ttt-root">
        <div className="ttt-board-area">
          <header className="ttt-header">
            <h1 className="ttt-title">Tic-Tac-Toe</h1>
            <p className="ttt-sub">{status}</p>
          </header>

          <div className="ttt-info">
            <div className="ttt-turn">
              Turn:{" "}
              <span className="ttt-turn-player">
                {gameOver ? "—" : currPlayer}
              </span>
            </div>
            <div className="ttt-status">
              Status: <span className="ttt-status-text">{status}</span>
            </div>
          </div>

          <div className="ttt-board">
            {board.map((cell, i) => (
              <div key={i} className="ttt-square" onClick={() => check(i)}>
                <div
                  className={`ttt-mark ${
                    cell === "X"
                      ? "ttt-mark--x"
                      : cell === "O"
                      ? "ttt-mark--o"
                      : ""
                  }`}
                >
                  {cell}
                </div>
              </div>
            ))}
          </div>

          <div className="ttt-controls">
            <button className="ttt-btn ttt-btn-primary" onClick={resetGame}>
              New Game
            </button>
            <button className="ttt-btn ttt-btn-outline" onClick={undoMove}>
              Undo
            </button>
          </div>

          <footer className="ttt-footer">
            <small>Tic Tac Toe with React + Hot Toast 🧩</small>
          </footer>
        </div>
      </div>
    </>
  );
}
