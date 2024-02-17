"use client";
import { useState } from "react";
import "./Keyboard.css";

export default function Keyboard() {
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");
  const [display4, setDisplay4] = useState("");
  const [display5, setDisplay5] = useState("");

  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  //   function typeInLine(key) {
  //     setDisplay1(key);
  //   }

  function typeInLine(key) {
    if (display1 === "") {
      setDisplay1(key);
    } else if (display1 !== "" && display2 === "") {
      setDisplay2(key);
    } else if (display1 !== "" && display2 !== "" && display3 === "") {
      setDisplay3(key);
    } else if (display1 !== "" && display2 !== "" && display3 !== "" && display4 === "") {
      setDisplay4(key);
    } else if (display1 !== "" && display2 !== "" && display3 !== "" && display4 !== "" && display5 === "") {
      setDisplay5(key);
    }
  }

  return (
    <div id="keyboard-container">
      <div id="line">
        <p className="display-box">{display1}</p>
        <p className="display-box">{display2}</p>
        <p className="display-box">{display3}</p>
        <p className="display-box">{display4}</p>
        <p className="display-box">{display5}</p>
      </div>

      <div className="keys-row">
        {firstRow.map((key, index) => (
          <button
            key={key}
            value={key}
            onClick={() => {
              typeInLine(key);
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keys-row">
        {secondRow.map((key, index) => (
          <button
            key={key}
            value={key}
            onClick={() => {
              typeInLine(key);
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keys-row">
        {thirdRow.map((key, index) => (
          <button
            key={key}
            value={key}
            onClick={() => {
              typeInLine(key);
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
