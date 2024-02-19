"use server";

import { sql } from "@vercel/postgres";

export default async function checkDB(guess) {

  try {
    const isAllowedGuess = await sql`SELECT * FROM words WHERE word=${guess.toLowerCase()}`;
    return isAllowedGuess;
  }
  catch(err) {
    console.log(err);
    return false;
  }

}
