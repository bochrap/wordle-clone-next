"use client";
import { createContext, useState, useContext } from "react";
import { checkDB, getTheWord } from "@/lib/checkDB";

const GameContext = createContext();

export default function GameContextProvider({ children }) {
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");
  const [display4, setDisplay4] = useState("");
  const [display5, setDisplay5] = useState("");

  async function getGuess() {
    if (display5 !== "") {
      const guess = display1 + display2 + display3 + display4 + display5;
      //console.log("important string!", guess);
      const isAllowedGuess = await checkDB(guess);
      console.log(isAllowedGuess);
    } else {
      const solution = await getTheWord();
      console.log(solution);
      // getTheWord();
      console.log("BAD BOY!");
    }
  }

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

  return <GameContext.Provider value={{ display1, display2, display3, display4, display5, getGuess, typeInLine }}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  return useContext(GameContext);
}
