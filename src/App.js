import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [hasRan, setHasRan] = useState(false);
  const [maxNumber, setMaxNumber] = useState(9);
  const [useAddition, setUseAddition] = useState(false);

  const [goal, setGoal] = useState(30);

  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [flashGreen, setFlashGreen] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [score, setScore] = useState(0);

  const [meterValue, setMeterValue] = useState(0);

  const currentMeterValue = useRef(meterValue);

  currentMeterValue.current = meterValue;

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
        //setMeterValue(Math.max(0, currentMeterValue.current - 1.5));
      }, 1000);
    }
  }, [timeRemaining]);

  const meterTimer = useRef();

  if (timeRemaining <= 0 && meterTimer.current) {
    clearInterval(meterTimer.current);
    meterTimer.current = null;
  }

  const countdown = timeRemaining - 60;

  useEffect(() => {
    if (timeRemaining > 0 && !meterTimer.current) {
      meterTimer.current = setInterval(() => {
        setMeterValue(Math.max(0, currentMeterValue.current - goal / 600));
      }, 100);
    }
  }, [timeRemaining, goal]);

  const onStart = () => {};

  const onSelectAddition = () => {
    setMeterValue(0);
    setUseAddition(true);
    onStart();
    if (timeRemaining) {
      clearTimeout(countdownTimer.current);
    }
    setCurrentProblem(getSet(true));
    setNumWrong(0);
    setNumCorrect(0);
    setScore(0);
    setTimeRemaining(63);
    setHasRan(true);
  };

  const onSelectMultiplication = () => {
    setMeterValue(0);
    setUseAddition(false);
    onStart();
    if (timeRemaining) {
      clearTimeout(countdownTimer.current);
    }
    setCurrentProblem(getSet(false));
    setNumWrong(0);
    setNumCorrect(0);
    setScore(0);
    setTimeRemaining(63);
    setHasRan(true);
  };

  const isWaiting = useRef(false);

  const flashTimeout = useRef(null);

  const onSelectAnswer = (answer) => {
    if (timeRemaining && !isWaiting.current) {
      const actualAnswer = useAddition ? number1 + number2 : number1 * number2;
      if (answer === actualAnswer) {
        setNumCorrect(numCorrect + 1);
        setScore(score + Math.floor(currentMeterValue.current));
        setMeterValue(Math.min(10, currentMeterValue.current + 1));
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
  const [goalInput, setGoalInput] = useState(goal);
  return (
    <div>
      {!timeRemaining && (
        <div className="intro">
          <div className="levels">
            <div className="levelsdesc">Select difficulty</div>
            <button
              className={maxNumber === 4 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(4);
              }}
            >
              4
            </button>
            <button
              className={maxNumber === 5 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(5);
              }}
            >
              5
            </button>
            <button
              className={maxNumber === 6 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(6);
              }}
            >
              6
            </button>
            <button
              className={maxNumber === 7 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(7);
              }}
            >
              7
            </button>
            <button
              className={maxNumber === 8 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(8);
              }}
            >
              8
            </button>
            <button
              className={maxNumber === 9 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(9);
              }}
            >
              9
            </button>
            <button
              className={maxNumber === 10 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(10);
              }}
            >
              10
            </button>
            <button
              className={maxNumber === 11 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(11);
              }}
            >
              11
            </button>
            <button
              className={maxNumber === 12 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(12);
              }}
            >
              12
            </button>
            <button
              className={maxNumber === 13 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(13);
              }}
            >
              13
            </button>
            <button
              className={maxNumber === 14 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(14);
              }}
            >
              14
            </button>
            <button
              className={maxNumber === 15 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(15);
              }}
            >
              15
            </button>
            <button
              className={maxNumber === 16 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(16);
              }}
            >
              16
            </button>
            <button
              className={maxNumber === 17 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(17);
              }}
            >
              17
            </button>
            <button
              className={maxNumber === 18 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(18);
              }}
            >
              18
            </button>
            <button
              className={maxNumber === 19 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(19);
              }}
            >
              19
            </button>
            <button
              className={maxNumber === 20 ? "selected" : ""}
              onClick={() => {
                setMaxNumber(20);
              }}
            >
              20
            </button>
            <div>
              <label>Goal: </label>
              <input
                type="number"
                value={goalInput}
                onChange={(e) => {
                  setGoalInput(e.target.value);
                  const newGoal = parseInt(e.target.value);
                  if (newGoal > 10 && newGoal < 100) {
                    setGoal(newGoal);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <div>
              {hasRan && !timeRemaining ? `You got ${numCorrect} right!` : ""}
            </div>
            <div>
              {" "}
              {hasRan && !timeRemaining ? `You got ${numWrong} wrong.` : ""}
            </div>
            <div>{hasRan && !timeRemaining ? `You scored ${score}!` : ""}</div>
          </div>
          <button style={{ fontSize: 20 }} onClick={onSelectAddition}>
            Addition test
          </button>
          <button style={{ fontSize: 20 }} onClick={onSelectMultiplication}>
            Multiplication test
          </button>
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
              <div>Time left: {timeRemaining}s</div>
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
            {answers.map((answer, index) => {
              const makeGreen =
                wrongAnswer !== null &&
                answer ===
                  (useAddition ? number1 + number2 : number1 * number2);

              const makeRed = wrongAnswer === answer;
              return (
                <div
                  className="AnswerDiv"
                  style={{
                    gridColumnStart: index >= 2 ? 2 : 1,
                    gridRowStart: (index % 2) + 1,
                  }}
                >
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
            <div
              style={{
                gridColumnStart: 3,
                gridRowStart: 1,
                gridRowEnd: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <meter
                max={10}
                min={0}
                value={meterValue}
                style={{
                  transform: "rotate(270deg)",
                  height: "80px",
                  width: "190px",
                  position: "absolute",
                }}
              ></meter>
            </div>
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
            <div style={{ fontSize: 32 }}>
              Correct:{" "}
              <span
                className={`correctanswer${flashGreen ? " flashgreen" : ""}`}
              >
                {numCorrect}
              </span>
            </div>
            <div style={{ fontSize: 32 }}>Wrong: {numWrong}</div>
            <div style={{ fontSize: 32 }}>Score: {score}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
