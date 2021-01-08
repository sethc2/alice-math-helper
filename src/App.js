import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getNext() {
  return getRandomInt(9) + 1;
}

function getSet() {
  const numerator = getNext();
  const denominator = getNext();

  const set = new Set();
  set.add(numerator * denominator);
  while (set.size < 4) {
    set.add(getNext() * denominator);
  }

  const answers = Array.from(set);
  answers.sort((a, b) => a - b);
  return { numerator, denominator, answers };
}

function App() {
  const [
    { numerator, denominator, answers },
    setCurrentProblem,
  ] = useState(() => getSet());
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [flashGreen, setFlashGreen] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(0);

  const countdownTimer = useRef();
  useEffect(() => {
    if (timeRemaining <= 0) {
    } else {
      countdownTimer.current = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }
  }, [timeRemaining]);

  const onStart = () => {
    if (timeRemaining) {
      clearTimeout(countdownTimer.current);
    }
    setNumWrong(0);
    setNumCorrect(0);
    setTimeRemaining(63);
  };

  const isWaiting = useRef(false);

  const flashTimeout = useRef(null);

  const onSelectAnswer = (answer) => {
    if (timeRemaining && !isWaiting.current) {
      const actualAnswer = numerator * denominator;
      if (answer === actualAnswer) {
        setNumCorrect(numCorrect + 1);
        setCurrentProblem(getSet());
        setFlashGreen(true);
        clearTimeout(flashTimeout.current);
        flashTimeout.current = setTimeout(() => {
          setFlashGreen(false);
        }, 1000);
      } else {
        isWaiting.current = true;
        setNumWrong(numWrong + 1);
        setWrongAnswer(answer);
        setTimeout(() => {
          setWrongAnswer(null);
          setCurrentProblem(getSet());
          isWaiting.current = false;
        }, 2000);
      }
    }
  };
  useEffect(() => {}, []);

  const countdown = timeRemaining - 60;
  return (
    <div>
      {countdown > 0 && <div className="countdown">{countdown}</div>}
      <div className={`App${countdown > 0 ? " app-opaque" : ""}`}>
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <button onClick={onStart}>Start</button>
            <span>Time left: {timeRemaining}s</span>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "60px",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {numerator} X {denominator}
          </div>
        </div>
        <div className="Answer">
          {answers.map((answer) => {
            const makeGreen =
              wrongAnswer !== null && answer === numerator * denominator;

            const makeRed = wrongAnswer === answer;
            return (
              <div className="AnswerDiv">
                <button
                  style={{
                    background: makeGreen
                      ? "lightgreen"
                      : makeRed
                      ? "red"
                      : "lightgrey",
                  }}
                  onClick={() => onSelectAnswer(answer)}
                >
                  {answer}
                </button>
              </div>
            );
          })}
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontSize: "60px",
          }}
        >
          <div>
            Correct:{" "}
            <span className={`correctanswer${flashGreen ? " flashgreen" : ""}`}>
              {numCorrect}
            </span>
          </div>
          <div>Wrong: {numWrong}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
