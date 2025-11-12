import React, { useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // increase by 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time as mm:ss:ms
  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif", marginTop: "50px" }}>
      <h1>⏱ Stopwatch</h1>
      <h2 style={{ fontSize: "2rem", margin: "20px 0" }}>{formatTime()}</h2>

      <button
        onClick={() => setIsRunning(!isRunning)}
        style={{
          margin: "0 10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={() => setTime(0)}
        style={{
          margin: "0 10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
}
