"use server";

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
}
