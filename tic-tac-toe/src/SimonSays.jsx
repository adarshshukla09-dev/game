import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SimonSays() {
  // sleep helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [red, setRed] = useState("#f0e6e6");
  const [blue, setBlue] = useState("#f0e6e6");
  const [green, setGreen] = useState("#f0e6e6");
  const [yellow, setYellow] = useState("#f0e6e6");
  const [arr, setArr] = useState([]);
  const [ai, setAi] = useState([]);
  const [user, setUser] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const genrateColor = () => {
    let colors = ["red", "blue", "green", "yellow"];
    let codiv = Math.floor(Math.random() * 4);
    let randomColor = colors[codiv];
    console.log(ai);
    return randomColor;
  };
const playSequence = async (sequence) => {
  for (let color of sequence) {
    blink(color);
    await sleep(800); // wait between blinks (increase/decrease for speed)
  }
};

  const start = async () => {
  const firstColor = genrateColor();
  const newAi = [firstColor];
  setAi(newAi);
  setUser([]);
  setIsPlaying(true);

  await playSequence(newAi); // play the AI pattern
  setIsPlaying(false);
};


  const checkMove = async () => {
  // Check correctness as user plays
  for (let i = 0; i < user.length; i++) {
    if (user[i] !== ai[i]) {
      toast.error("Wrong move! Game over.");
      setAi([]);
      setUser([]);
      setIsPlaying(false);
      return;
    }
  }

  // If user completed sequence correctly
  if (user.length === ai.length && ai.length > 0) {
    toast.success("Correct! Watch for the next sequence...");
    const nextColor = genrateColor();
    const newAi = [...ai, nextColor];
    setAi(newAi);
    setUser([]);
    setIsPlaying(true);

    await playSequence(newAi); // replay new sequence
    setIsPlaying(false);
  }
};


  useEffect(() => {
    if (user.length > 0) checkMove();
  }, [user]);

  const handleOnClick = (color) => {
    if (isPlaying) return; // prevent clicks during AI sequence
    setUser((prev) => [...prev, color]);
    blink(color);
  };

  const blink = async  (color) => {
    const blinkDuration = 600; // was 300, now 600ms for longer light
    if (color == "green") {
      setGreen("#07f68f");
      setTimeout(() => setGreen("#f0e6e6"), blinkDuration);
    } else if (color == "red") {
      setRed("#f64b07ff");
      setTimeout(() => setRed("#f0e6e6"), blinkDuration);
    } else if (color == "blue") {
      setBlue("#5f07f6ff");
      setTimeout(() => setBlue("#f0e6e6"), blinkDuration);
    } else if (color == "yellow") {
      setYellow("#a2f607ff");
      setTimeout(() => setYellow("#f0e6e6"), blinkDuration);
    }
  };

  useEffect(()=>{
   console.log(ai)
  },[ai])
  return (
    <>
      <style>{`
      .btn {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  cursor: pointer;
  border: 3px solid #555;
  user-select: none;
  font-size: 0;
}

        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
          background-color: #222;
        }

        .row {
          display: flex;
          gap: 20px;
        }

        .btn {
          width: 150px;
          height: 150px;
          border-radius: 15px;
          cursor: pointer;
        }

          h1{
font-weight: bold;
          font-size:5vh;
          color:white;
          }
      `}</style>

      <div className="container">
        <h1>Simon Says</h1>
        <div className="row">
          <div
            style={{ backgroundColor: red }}
            onClick={() => handleOnClick("red")}
            className="btn red"
          >
            red
          </div>
          <div
            style={{ backgroundColor: blue }}
            onClick={() => handleOnClick("blue")}
            className="btn blue"
          >
            blue
          </div>
        </div>
        <div className="row">
          <div
            style={{ backgroundColor: green }}
            onClick={() => handleOnClick("green")}
            className="btn "
            value="{green}"
          >
            green
          </div>
          <div
            style={{ backgroundColor: yellow }}
            className="btn "
            onClick={() => handleOnClick("yellow")}
          >
            yellow
          </div>
        </div>
        <button onClick={start}>st</button>
      </div>
    </>
  );
}

export default SimonSays;
