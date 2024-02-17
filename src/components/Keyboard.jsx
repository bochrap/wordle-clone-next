"use client";
import { useState } from "react";

export default function Keyboard() {
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");

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
    }
  }

  return (
    <div id="keyboard-container">
      <p className="display-box">Display1: {display1}</p>
      <p className="display-box">Display2: {display2}</p>
      <p className="display-box">Display3: {display3}</p>

      <div className="keys-row">
        <button
          onClick={() => {
            setDisplay1("q");
          }}
        >
          q
        </button>
        <button
          onClick={() => {
            setDisplay1("w");
          }}
        >
          {" "}
          w
        </button>
        <button
          onClick={() => {
            setDisplay1("e");
          }}
        >
          e
        </button>
        <button
          onClick={() => {
            setDisplay1("r");
          }}
        >
          r
        </button>
      </div>
      <br />
      <div className="keys-row">
        <button
          onClick={() => {
            setDisplay1("a");
          }}
        >
          a
        </button>
        <button
          onClick={() => {
            setDisplay1("s");
          }}
        >
          s
        </button>
        <button
          onClick={() => {
            setDisplay1("d");
          }}
        >
          d
        </button>
        <button
          onClick={() => {
            setDisplay1("f");
          }}
        >
          f
        </button>
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
