import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [hasRan, setHasRan] = useState(false);
  const [showIntro, setShowInto] = useState(true);
  const [maxNumber, setMaxNumber] = useState(9);
  const [maxNumberInput, setMaxNumberInput] = useState(maxNumber.toString());
  const [useAddition, setUseAddition] = useState(false);

  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [flashGreen, setFlashGreen] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);

  const getNext = () => {
    return getRandomInt(maxNumber) + 1;
  };

  const getAddition = () => {
    const firstNumber = getNext();
    const secondNumber = getNext();

    const set = new Set();
    set.add(firstNumber + secondNumber);
    while (set.size < 4) {
      set.add(getNext() + secondNumber);
    }

    const answers = Array.from(set);
    answers.sort((a, b) => a - b);
    return { number1: firstNumber, number2: secondNumber, answers };
  };

  const getMultiplication = () => {
    const numerator = getNext();
    const denominator = getNext();

    const set = new Set();
    set.add(numerator * denominator);
    while (set.size < 4) {
      set.add(getNext() * denominator);
    }

    const answers = Array.from(set);
    answers.sort((a, b) => a - b);
    return { number1: numerator, number2: denominator, answers };
  };

  const getSet = (addition) => {
    if (addition) {
      return getAddition();
    }
    return getMultiplication();
  };

  const [{ number1, number2, answers }, setCurrentProblem] = useState(() =>
    getSet()
  );

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

  const onStart = () => {};

  const [error, setError] = useState();

  const onSelectAddition = () => {
    if (maxNumber >= 4) {
      setError("");
      setMaxNumberInput(maxNumber.toString());
      setUseAddition(true);
      onStart();
      if (timeRemaining) {
        clearTimeout(countdownTimer.current);
      }
      setCurrentProblem(getSet(true));
      setNumWrong(0);
      setNumCorrect(0);
      setTimeRemaining(63);
      setHasRan(true);
    } else {
      setError("Max number must be at least 4");
    }
  };

  const onSelectMultiplication = () => {
    if (maxNumber >= 4) {
      setError("");
      setMaxNumberInput(maxNumber.toString());
      setUseAddition(false);
      onStart();
      if (timeRemaining) {
        clearTimeout(countdownTimer.current);
      }
      setCurrentProblem(getSet(false));
      setNumWrong(0);
      setNumCorrect(0);
      setTimeRemaining(63);
      setHasRan(true);
    } else {
      setError("Max number must be at least 4");
    }
  };

  const isWaiting = useRef(false);

  const flashTimeout = useRef(null);

  const onSelectAnswer = (answer) => {
    if (timeRemaining && !isWaiting.current) {
      const actualAnswer = useAddition ? number1 + number2 : number1 * number2;
      if (answer === actualAnswer) {
        setNumCorrect(numCorrect + 1);
        setCurrentProblem(getSet(useAddition));
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
          setCurrentProblem(getSet(useAddition));
          isWaiting.current = false;
        }, 2000);
      }
    }
  };
  useEffect(() => {}, []);

  const countdown = timeRemaining - 60;
  return (
    <div>
      {!timeRemaining && (
        <div className="intro">
          <div>
            <label>Max number:</label>
            <input
              type="number"
              value={maxNumberInput}
              min={2}
              onChange={(e) => {
                setMaxNumberInput(e.target.value);
                setMaxNumber(
                  parseInt(e.target.value, 10) > 2
                    ? parseInt(e.target.value, 10)
                    : 9
                );
              }}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
          <button style={{ fontSize: 20 }} onClick={onSelectAddition}>
            Addition test
          </button>
          <button style={{ fontSize: 20 }} onClick={onSelectMultiplication}>
            Multiplication test
          </button>
          <div>
            {hasRan && !timeRemaining ? `You got ${numCorrect} right!` : ""}
          </div>
        </div>
      )}
      {countdown > 0 && <div className="countdown">{countdown}</div>}
      {countdown <= 0 && timeRemaining > 0 && (
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
              {!useAddition && (
                <span>
                  {number1} X {number2}
                </span>
              )}
              {useAddition && (
                <span>
                  {number1} + {number2}
                </span>
              )}
            </div>
          </div>
          <div className="Answer">
            {answers.map((answer) => {
              const makeGreen =
                wrongAnswer !== null &&
                answer ===
                  (useAddition ? number1 + number2 : number1 * number2);

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
              <span
                className={`correctanswer${flashGreen ? " flashgreen" : ""}`}
              >
                {numCorrect}
              </span>
            </div>
            <div>Wrong: {numWrong}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
