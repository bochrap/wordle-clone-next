"use server";

/* ----- Third Party Imports ----- */
import { sql } from "@vercel/postgres";

export async function checkDB(guess) {
  try {
    const isAllowedGuess = await sql`SELECT * FROM words WHERE word=${guess.toLowerCase()}`;
    return isAllowedGuess;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function updateDatabaseGuess(id, guess, row) {
  const guessQuery = `UPDATE games SET guess${row}='${guess}', current_guess=${row} WHERE id=${id};`;
  console.log("query is ", guessQuery);
  //const submit = await sql`UPDATE games SET guess${row}=${guess} WHERE id=${id}`;
  const insert = await sql.query(guessQuery);
}

export async function getTheWord() {
  // number of solutions: 2315
  // NUMBER OF SOLUTIONS = await sql`SELECT COUNT(*) FROM words WHERE issolution='TRUE'`;
  const generateWordId = Math.floor(Math.random() * 2315) + 1;
  const fetchTheWord = await sql`SELECT * FROM words WHERE id=${generateWordId}`;
  const wordString = fetchTheWord.rows[0].word;
  return wordString;
}

export async function createGame(solution, user) {
  const newgame = await sql`INSERT INTO games (user_id, game_start_time, solution) VALUES (${user}, CURRENT_TIMESTAMP, ${solution})`;
  console.log(newgame)
}

export async function checkGame(userId) {
  const game = await sql`SELECT * FROM games WHERE user_id=${userId} AND isLiveGame='TRUE'`;

  console.log("game is ", game);
  if (game.rowCount === 0) {
    // console.log("im zero rows ");
    return false;
  } else {
    return game;
  }
}

export async function gameEndQuery(currentGame) {
  const submit =
    await sql`UPDATE games SET islivegame='FALSE', game_end_time=CURRENT_TIMESTAMP, success=${currentGame.success} WHERE id=${currentGame.id}`;
}
