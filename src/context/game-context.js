"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { checkDB, getTheWord, createGame, checkGame } from "@/lib/checkDB";
import { getUserId } from "@/lib/users";
import toast from "react-hot-toast";

const GameContext = createContext();

export default function GameContextProvider({ children }) {
  let currentGameObject = {
    id: null,
    user_id: null,
    game_start_time: null,
    game_end_time: null,
    solution: null,
    guess_one: null,
    guess_two: null,
    guess_three: null,
    guess_four: null,
    guess_five: null,
    guess_six: null,
    duration: null,
    success: null,
    current_guess: 1,
    score: null,
  };

  const displayObject = {
    value: "",
    class: "default",
  }
  const rowArray = [
    displayObject, displayObject, displayObject, displayObject, displayObject
  ];

  const [currentGame, setCurrentGame] = useState(currentGameObject);
  const [currentRow, setCurrentRow] = useState(1);

  const [ row1, setRow1] = useState([
    {
    value: "",
    class: "default",
  }, {
    value: "",
    class: "default",
  }, {
    value: "",
    class: "default",
  }, {
    value: "",
    class: "default",
  }, {
    value: "",
    class: "default",
  }
  ]);
  const [ rowTwo, setRowTwo] = useState(rowArray);
  const [ rowThree, setRowThree] = useState(rowArray);
  const [ rowFour, setRowFour] = useState(rowArray);
  const [ rowFive, setRowFive] = useState(rowArray);
  const [ rowSix, setRowSix ] = useState(rowArray);

  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");
  const [display4, setDisplay4] = useState("");
  const [display5, setDisplay5] = useState("");

  const [display1state, setDisplay1state] = useState("default");
  const [display2state, setDisplay2state] = useState("default");
  const [display3state, setDisplay3state] = useState("default");
  const [display4state, setDisplay4state] = useState("default");
  const [display5state, setDisplay5state] = useState("default");


  
  async function getGuess(currentRowArray) {
    console.log("current row array ", currentRowArray);
    if (currentRowArray[4].value !== "") {
      const guess = currentRowArray[0].value + currentRowArray[1].value + currentRowArray[2].value + currentRowArray[3].value + currentRowArray[4].value;
      //console.log("important string!", guess);
      const isAllowedGuess = await checkDB(guess);
      if (isAllowedGuess.rowCount > 0) {
        let solutionarray = currentGame.solution.split("");
        // MY CHANGES START HERE (EDUARDO)

        let guessarray = [currentRowArray[0].value.toLowerCase(), currentRowArray[1].value.toLowerCase(), currentRowArray[2].value.toLowerCase(), currentRowArray[3].value.toLowerCase(), currentRowArray[4].value.toLowerCase()]; // new from here
        let resultarray = new Array(5); // array of 5x5

        for (let i = 0; i < solutionarray.length; i++) {
          resultarray[i] = new Array(5); // Initialize each row of the matrix
          for (let j = 0; j < guessarray.length; j++) {
            // Compare elements and store the result in the comparison matrix
            resultarray[i][j] = solutionarray[i] === guessarray[j];
          }
        }
        // Log the comparison matrix to the console
        console.log(resultarray);

        // Initialize an array INLINE to store the sum of each column (check if "good")
        let columnSums = new Array(resultarray.length).fill(0);

        // Sum values in each column
        for (let j = 0; j < resultarray.length; j++) {
          // Iterate columns
          for (let i = 0; i < resultarray.length; i++) {
            // Iterate rows
            columnSums[j] += resultarray[i][j] ? 1 : 0; // Add 1 if true, 0 otherwise
          }
        }

        console.log("good:", columnSums);

        // Map results of i = j (main diagonal)(check if "perfect")
        const diagonalResults = resultarray.map((row, i) => row[i]);

        console.log("Perfect:", diagonalResults);

        // Sum the two matrices
        const sumMatrix = columnSums.map((element, index) => element + diagonalResults[index]);

        console.log(sumMatrix);

        function changeColours() {


          sumMatrix.forEach((element, index) => {
            if (element === 0) {
              eval(`setDisplay${index + 1}state("grey")`);
              console.log(index, "grey");
            } else if (element === 1) {
              eval(`setDisplay${index + 1}state("yellow")`);
              console.log(index, "yellow");
            } else if (element === 2) {
              eval(`setDisplay${index + 1}state("green")`);
              console.log(index, "green");
            }
          });
        }
        changeColours();

        // THIS IS THE END OF MY CHANGES (EDUARDO)

        console.log("It is a valid word but might not be correct");
      } else {
        console.log("Not a valid word");
      }

      console.log(isAllowedGuess);
    } else {
      // getTheWord();
      console.log("BAD BOY!");
      runToast("BAD BOY");
    }
  }

  function runToast(message) {
    toast.error(message);
  }

  async function startNewGame() {
    const user = await getUserId();
    const isGame = await checkGame(user);
    if (!isGame) {
      const solution = await getTheWord();
      console.log(solution, user);
      createGame(solution, user);
    } else {
      let gameValues = {};
      if (isGame.rows[0]) {
        gameValues = isGame.rows[0];
        const copyCurrentGame = { ...currentGameObject };
        copyCurrentGame.id = gameValues.id;
        copyCurrentGame.user_id = gameValues.user_id;
        copyCurrentGame.game_start_time = gameValues.game_start_time;
        copyCurrentGame.solution = gameValues.solution;
        copyCurrentGame.current_guess = gameValues.current_guess;
        updateCurrentGame(copyCurrentGame);
      }
    }
  }

  function updateCurrentGame(copiedObject) {
    setCurrentGame({ ...currentGame, ...copiedObject });
  }

  function typeInLine(key) {
    const copyRow = [...eval(`row${currentRow}`) ];
    if (eval(`row${currentRow}[0].value === "" `)) {
      //setDisplay1(key);
      console.log("inside first index ");
      copyRow[0].value = key;
      
    } else if (rowOne[0].value !== "" && rowOne[1].value === "") {
      //setcopyRow[0].value(key);
      copyRow[1].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value === "") {
      //setcopyRow[0].value(key);
      copyRow[2].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value !== "" && copyRow[3].value === "") {
      //setcopyRow[0].value(key);
      copyRow[3].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value !== "" && copyRow[3].value !== "" && copyRow[4].value === "") {
      //setDisplay5(key);
      copyRow[4].value = key;
    }
    console.log("Now copy row is", copyRow);
    eval(`setRow${currentRow}(copyRow);`)
  }

  function deleteLetter() {
    if (display5 !== "") {
      setDisplay5("");
    } else if (display5 === "" && display4 !== "") {
      setDisplay4("");
    } else if (display5 === "" && display4 === "" && display3 !== "") {
      setDisplay3("");
    } else if (display5 === "" && display4 === "" && display3 === "" && display2 !== "") {
      setDisplay2("");
    } else if (display5 === "" && display4 === "" && display3 === "" && display2 === "" && display1 !== "") {
      setDisplay1("");
    }
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        display1,
        display2,
        display3,
        display4,
        display5,
        getGuess,
        typeInLine,
        startNewGame,
        deleteLetter,
        display1state,
        display2state,
        display3state,
        display4state,
        display5state,
        row1,
        rowTwo,
        rowThree,
        rowFour,
        rowFive,
        rowSix,
        runToast,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
