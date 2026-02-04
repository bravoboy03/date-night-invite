import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

const name = "Maitri";

function App() {
  const [started, setStarted] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ top: "65%", left: "55%" });
  const audioRef = useRef(null);

  // Floating hearts
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 3 + Math.random() * 3 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 350);

    return () => clearInterval(interval);
  }, [started]);

  const startExperience = () => {
    const audio = audioRef.current;
    audio.volume = 0.6;
    audio.play();
    setStarted(true);
  };

  const moveNo = () => {
    setNoPos({
      top: Math.random() * 70 + "%",
      left: Math.random() * 70 + "%",
    });
  };

  const handleYes = () => {
    setYesClicked(true);
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="page">
      <audio ref={audioRef} src="/music.mp3" loop />

      {!started && (
        <div className="start-overlay">
          <div className="start-card">
            <h1>💖 For Maitri 💖</h1>
            <p>Tap to begin our Valentine moment</p>
            <button className="heartbeat" onClick={startExperience}>
              Start 💕
            </button>
          </div>
        </div>
      )}

      {started && (
        <>
          <div className="candle-glow" />

          <div className="center-box">
            {!yesClicked ? (
              <>
                <h1 className="name">
                  {name.split("").map((c, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>
                      {c}
                    </span>
                  ))}
                </h1>

                <h2>Will you be my Valentine? 💖</h2>

                <div className="buttons">
                  <button className="yes" onClick={handleYes}>
                    Yes 💍
                  </button>

                  <button
                    className="no"
                    style={{ top: noPos.top, left: noPos.left }}
                    onMouseEnter={moveNo}
                    onTouchStart={moveNo}
                  >
                    No 🙅‍♀️
                  </button>
                </div>
              </>
            ) : (
              <div className="details">
                <h1>🥰 It’s a Date! 🥰</h1>
                <p>
                  Maitri, loving you is my favorite thing in the world.
                  Thank you for being my forever Valentine ❤️
                </p>
                <p><strong>📅</strong> February 14</p>
                <p><strong>⏰</strong> 7:30 PM</p>
                <p><strong>📍</strong> Our favorite place 🕯️</p>
              </div>
            )}
          </div>

          <div className="candles">
            <div className="candle"><span className="flame" /></div>
            <div className="candle"><span className="flame" /></div>
            <div className="candle"><span className="flame" /></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
