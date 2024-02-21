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
  // const rowArray = [
  //   ...displayObject, ...displayObject, ...displayObject, ...displayObject, ...displayObject
  // ];  

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
  const [ row2, setRow2] = useState([
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
  // const [ rowThree, setRowThree] = useState(rowArray);
  // const [ rowFour, setRowFour] = useState(rowArray);
  // const [ rowFive, setRowFive] = useState(rowArray);
  // const [ rowSix, setRowSix ] = useState(rowArray);

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


  function changeColours(sumMatrix) {
    const copyRow = [...eval(`row${currentRow}`)];
    console.log("copy row inside of colours function is ", copyRow);
    sumMatrix.forEach((element, index) => {
      if (element === 0) {
        copyRow[index].class = "grey";
        console.log(index, "grey");
      } else if (element === 1) {
        copyRow[index].class = "yellow";
        console.log(index, "yellow");
      } else if (element === 2) {
        copyRow[index].class = "green";
        console.log(index, "green");
      }
    });
    eval(`setRow${currentRow}(copyRow);`)
  }
  
  async function getGuess() {
    const currentRowArray = eval(`row${currentRow}`);
    if (currentRowArray[4].value !== "") {
      const guess = currentRowArray[0].value + currentRowArray[1].value + currentRowArray[2].value + currentRowArray[3].value + currentRowArray[4].value;
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

        // Map results of i = j (main diagonal)(check if "perfect")
        const diagonalResults = resultarray.map((row, i) => row[i]);

        // Sum the two matrices
        const sumMatrix = columnSums.map((element, index) => element + diagonalResults[index]);

        changeColours(sumMatrix);
        setCurrentRow(2);
        // THIS IS THE END OF MY CHANGES (EDUARDO)

      } else {
        console.log("Not a valid word");
      }

    } else {
      // getTheWord();
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
    if (copyRow[0].value === "" ) {
      //setDisplay1(key);
      console.log("inside first index ");
      copyRow[0].value = key;
      
    } else if (copyRow[0].value !== "" && copyRow[1].value === "" ) {
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
    eval(`setRow${currentRow}(copyRow);`)
  }

  function deleteLetter() {
    const copyRow = [...eval(`row${currentRow}`) ];
    if (copyRow[4].value !== "") {
      copyRow[4].value = "";
    } else if (copyRow[4].value === "" && copyRow[3].value !== "") {
      copyRow[3].value = "";
    } else if (copyRow[4].value === "" && copyRow[3].value === "" && copyRow[2].value !== "") {
      copyRow[2].value = "";
    } else if (copyRow[4].value === "" && copyRow[3].value === "" && copyRow[2].value === "" && copyRow[1].value !== "") {
      copyRow[1].value = "";
    } else if (copyRow[4].value === "" && copyRow[3].value === "" && copyRow[2].value === "" && copyRow[1].value === "" && copyRow[0].value !== "") {
      copyRow[0].value = "";
    }
    eval(`setRow${currentRow}(copyRow);`)
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
        row2,
        // rowThree,
        // rowFour,
        // rowFive,
        // rowSix,
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
