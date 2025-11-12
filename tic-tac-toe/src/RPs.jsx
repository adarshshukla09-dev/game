import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RPs() {
  const [ai, setAi] = useState("");
  const [ans, setAns] = useState("");

  const fun = (playerChoice) => {
    const arr = ["r", "p", "s"];
    const ran = Math.floor(Math.random() * 3);
    const aiChoice = arr[ran];
    setAi(aiChoice);

    if (aiChoice === playerChoice) {
      toast("It's a tie!", { icon: "🤝" });
    } else if (
      (aiChoice === "r" && playerChoice === "p") ||
      (aiChoice === "p" && playerChoice === "s") ||
      (aiChoice === "s" && playerChoice === "r")
    ) {
      toast.success("You won!");
    } else {
      toast.error("You lost!");
    }
  };

  return (
    <>
      <style>{`
        .game {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #f8fafc;
          font-family: Poppins, sans-serif;
        }
        .title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 40px;
          color: #22c55e;
        }
        .choices {
          display: flex;
          gap: 20px;
        }
        .choice {
          width: 120px;
          height: 120px;
          background-color: #1e293b;
          border: 3px solid #22c55e;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 0 10px rgba(34,197,94,0.3);
        }
        .choice:hover {
          background-color: #22c55e;
          color: #0f172a;
          transform: scale(1.05);
          box-shadow: 0 0 15px #22c55e;
        }
        .result {
          margin-top: 20px;
          font-size: 1.2rem;
        }
      `}</style>

      <div className="game">
        <div className="title">Rock • Paper • Scissors</div>

        <div className="choices">
          <div className="choice" onClick={() => { setAns("r"); fun("r"); }}>Rock</div>
          <div className="choice" onClick={() => { setAns("p"); fun("p"); }}>Paper</div>
          <div className="choice" onClick={() => { setAns("s"); fun("s"); }}>Scissors</div>
        </div>

        {ai && (
          <div className="result">
            AI chose:{" "}
            {ai === "r" ? "Rock" : ai === "p" ? "Paper" : "Scissors"}
          </div>
        )}
      </div>
    </>
  );
}
