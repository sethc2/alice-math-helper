import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

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
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(60);

  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (timeRemaining <= 0) {
    } else {
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }
  }, [timeRemaining]);

  const onStart = () => {
    setNumWrong(0);
    setNumWrong(0);
    setTimeRemaining(60);
  };

  const onSelectAnswer = (answer) => {
    if (timeRemaining) {
      const actualAnswer = numerator * denominator;
      if (answer === actualAnswer) {
        setNumCorrect(numCorrect + 1);
      } else {
        setNumWrong(numWrong + 1);
      }
      setCurrentProblem(getSet());
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="App">
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
        {answers.map((answer) => (
          <div className="AnswerDiv">
            <button onClick={() => onSelectAnswer(answer)}>{answer}</button>
          </div>
        ))}
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
        <div>Correct: {numCorrect}</div>
        <div>Wrong: {numWrong}</div>
      </div>
    </div>
  );
}

export default App;
