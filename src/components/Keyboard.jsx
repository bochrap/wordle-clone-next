"use client";

/* ----- Third Party Imports ----- */
import toast, { Toaster } from "react-hot-toast";

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";
import "./Keyboard.css";

export default function Keyboard() {
  const { typeInLine, getGuess, deleteLetter, runToast, disabledButtons } = useGameContext();

  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  // let disabledButtons = ["A", "C", "E"];

  function isButtonDisabled(key) {
    return disabledButtons.includes(key);
  }

  function assignClass(key) {
    if (isButtonDisabled(key)) {
      return "disabled";
    } else {
      return;
    }
  }

  return (
    <div id="keyboard-container">
      <Toaster />
      <div className="keys-row">
        {firstRow.map((key, index) => (
          <button
            key={key}
            value={key}
            disabled={isButtonDisabled(key)}
            className={assignClass(key)}
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
            disabled={isButtonDisabled(key)}
            className={assignClass(key)}
            onClick={() => {
              typeInLine(key);
            }}
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => {
            deleteLetter();
          }}
          id="del-button"
        >
          ❌
        </button>
      </div>
      <div className="keys-row">
        {thirdRow.map((key, index) => (
          <button
            key={key}
            value={key}
            disabled={isButtonDisabled(key)}
            className={assignClass(key)}
            onClick={() => {
              typeInLine(key);
            }}
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => {
            getGuess();
          }}
          id="enter-button"
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
