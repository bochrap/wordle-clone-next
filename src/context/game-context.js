"use client";

/* ----- Third Party Imports ----- */
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

/* ----- Project Imports ----- */
import { checkDB, getTheWord, createGame, checkGame, gameEndQuery, updateDatabaseGuess } from "@/lib/checkDB";
import { getUserId } from "@/lib/users";

const GameContext = createContext();

const initialState = [
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
];

const currentGameObject = {
  id: null,
  user_id: null,
  game_start_time: null,
  game_end_time: null,
  solution: null,
  guess1: null,
  guess2: null,
  guess3: null,
  guess4: null,
  guess5: null,
  guess6: null,
  duration: null,
  success: null,
  current_guess: 1,
  score: null,
};

export default function GameContextProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(JSON.parse(JSON.stringify(currentGameObject)));
  const [currentRow, setCurrentRow] = useState(1);

  const [disabledButtons, setDisabledButtons] = useState([]);

  /*
           _   
       .__(.)< (MEOW)
        \___)
  ~~~~~~~~~~~~~~~~~~ */
  const [row1, setRow1] = useState(JSON.parse(JSON.stringify(initialState)));
  const [row2, setRow2] = useState(JSON.parse(JSON.stringify(initialState)));
  const [row3, setRow3] = useState(JSON.parse(JSON.stringify(initialState)));
  const [row4, setRow4] = useState(JSON.parse(JSON.stringify(initialState)));
  const [row5, setRow5] = useState(JSON.parse(JSON.stringify(initialState)));
  const [row6, setRow6] = useState(JSON.parse(JSON.stringify(initialState)));

  function endCurrentGame() {
    gameEndQuery(currentGame);
  }

  function changeColours(sumMatrix) {
    const copyRow = [...eval(`row${currentRow}`)];
    sumMatrix.forEach((element, index) => {
      if (element === 0) {
        copyRow[index].class = "grey";
      } else if (element === 1) {
        copyRow[index].class = "yellow";
      } else if (element === 2) {
        copyRow[index].class = "green";
      }
    });
    eval(`setRow${currentRow}(copyRow);`);
  }

  function disableKeys(myArray, guessarray) {
    myArray.forEach((item, index) => {
      if (item === 0) {
        // setDisabledButtons(disabledButtons.push(guessarray[index]));
        setDisabledButtons((prevButtons) => [...prevButtons, guessarray[index].toUpperCase()]);
      }
      //runToast(disabledButtons);
    });
  }

  async function updateGuesses(guess) {
    //Update Game object first
    const copyGame = {...currentGame };
    const newGuess = eval(`copyGame.guess${currentRow} = guess`);
    updateCurrentGame(copyGame);
    //Update Database
    updateDatabaseGuess(currentGame.id, guess, currentRow);
  }

  async function getGuess() {
    console.log("game Object now ", currentGame);
    const currentRowArray = eval(`row${currentRow}`);
    if (currentRowArray[4].value !== "") {
      const guess = currentRowArray[0].value + currentRowArray[1].value + currentRowArray[2].value + currentRowArray[3].value + currentRowArray[4].value;
      const isAllowedGuess = await checkDB(guess);
      if (isAllowedGuess.rowCount > 0) {

        updateGuesses(guess);

        /*
                  _   
              .__(.)< (Eduardo NO!)
              \___)
        ~~~~~~~~~~~~~~~~~~ 
                              _   
        (Matrix Good!)      >(.)__.
                              (___/
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        let solutionarray = currentGame.solution.split("");

        let guessarray = [
          currentRowArray[0].value.toLowerCase(),
          currentRowArray[1].value.toLowerCase(),
          currentRowArray[2].value.toLowerCase(),
          currentRowArray[3].value.toLowerCase(),
          currentRowArray[4].value.toLowerCase(),
        ]; // new from here
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

        //Function that changes the class values in the row - used by Display Component. 
        changeColours(sumMatrix);

        if (sumMatrix[0] === 2 && sumMatrix[1] === 2 && sumMatrix[2] === 2 && sumMatrix[3] === 2 && sumMatrix[4] === 2) {
          // endCurrentGame();
          runToast("Game end triggered");
        } 
        else {
          disableKeys(sumMatrix, guessarray);
          if (currentRow === 6) {
            runToast("End game triggered (failed guess)");
          } 
          else {
            runToast(`${guess.toLowerCase()} added to current game obj`);
            setCurrentRow(currentRow + 1);
          }
        }

        function updateGameTable() {}
      } 
      else {
        runToast("NOT A VALID GUESS");
      }
    } 
    else {
      runToast("TYPE 5 LETTER WORD");
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
        for (let i = 1; i <= gameValues.current_guess; i++) {
          eval(`copyCurrentGame.guess${i} = gameValues.guess${i}`);
          setCurrentRow(i + 1);
          let guess = "";
          eval(`guess = gameValues.guess${i}`);
          populateRows(i, guess);
          
        }
        updateCurrentGame(copyCurrentGame);
      }
    }
  }

  function populateRows(row, guess) {
    console.log("i have been called", row, guess);
    const copyRow = [...eval(`row${row}`)];
    for (let i = 0; i < 5; i++) {
      copyRow[i].value = guess.charAt(i);
    }
    copyRow.value = guess;
    console.log(copyRow);
    eval(`setRow${row}(copyRow);`);
  }

  function updateCurrentGame(copiedObject) {
    setCurrentGame({ ...currentGame, ...copiedObject });
  }

  function typeInLine(key) {
    const copyRow = [...eval(`row${currentRow}`)];
    if (copyRow[0].value === "") {
      copyRow[0].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value === "") {
      copyRow[1].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value === "") {
      copyRow[2].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value !== "" && copyRow[3].value === "") {
      copyRow[3].value = key;
    } else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value !== "" && copyRow[3].value !== "" && copyRow[4].value === "") {
      copyRow[4].value = key;
    }
    eval(`setRow${currentRow}(copyRow);`);
  }

  function deleteLetter() {
    const copyRow = [...eval(`row${currentRow}`)];
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
    eval(`setRow${currentRow}(copyRow);`);
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        getGuess,
        typeInLine,
        startNewGame,
        deleteLetter,
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
        runToast,
        disabledButtons,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
