import React, { useEffect, useState } from "react";
import "./riddle.css";
import checked from "../../assets/checkbox-checked.svg";
import unchecked from "../../assets/checkbox-unchecked.svg";

export default function Riddle() {
  const [data, setData] = useState({
    riddle: "Loading...",
    answer: "Loading...",
  });

  const [show, setShow] = useState("hide");

  const [showAnswer, setShowAnswer] = useState(false);

  async function fetchRiddles() {
    const response = await fetch(`https://riddles-api.vercel.app/random`);
    setData(await response.json());
  }

  // useMemo(() => fetchRiddles(), []);
  useEffect(() => {
    fetchRiddles();
    console.log("re-render", new Date());
  }, []);
  const handleShowAnswer = () => {
    if (showAnswer === true) {
      return (
        <img
          id="checked"
          src={checked}
          alt="checked"
          width="20px"
        />
      );
    } else {
      // setShow("hide");
      return <img src={unchecked} alt="checked" width="20px" />;
    }
  };

  return (
    <div>
      <div className="riddle centered">
        <h3>{data.riddle}</h3>
      </div>

      <span className="options-button-wrapper centered">
        <button
          className="answer-button"
          onClick={() => {
            show === "hide" ? setShow("show") : setShow("hide");
          }}
        >
          <strong>Click to see answer</strong>
        </button>
        <button
          className="update-button"
          onClick={() => {
            fetchRiddles();
            if (showAnswer === false) {
              setShow("hide");
            } else {
              setShow("show");
            }
          }}
        >
          <strong>Update</strong>
        </button>
        <button
          className="show-button"
          onClick={() => {
            console.log("---------------");
            console.log("Before: ", showAnswer);
            setShowAnswer(!showAnswer);
            console.log("After: ", showAnswer);
          }}
        >
          <span className="checkbox-wrapper">{handleShowAnswer()}</span>
          <strong>Show Answer</strong>
        </button>
      </span>

      <div className={`riddle ${show} centered`}>
        <h3>{data.answer}</h3>
      </div>
    </div>
  );
}
