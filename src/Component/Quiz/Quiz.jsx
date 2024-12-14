import { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/Data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (index === data.length - 1) {
      setResult(true);
      return 0;
    }
    if (lock === true && index < data.length - 1) {
      // Reset the option classes before changing the question
      option_array.forEach((option) =>
        option.current.classList.remove("correct", "wrong")
      );

      // Increment index and update question
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setQuestion(data[newIndex]); // Update the question
        return newIndex;
      });

      // Reset the lock to allow selection on the next question
      setLock(false);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[index]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={option1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={option2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={option3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={option4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
        {result ? (
          <>
            <h2>
              You scored {score} out of {data.length}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Quiz;
