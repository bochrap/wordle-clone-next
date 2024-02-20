"use client";
import "./Keyboard.css";
import { useGameContext } from "@/context/game-context";

export default function Keyboard() {
  const { typeInLine, getGuess, deleteLetter } = useGameContext();
  //const { getGuess } = useGameContext();

  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div id="keyboard-container">
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
