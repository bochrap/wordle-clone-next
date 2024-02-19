const WARNING = "To run this file you need to copy the file .env.local to .env";
//console.log(WARNING);

/* ----- Third Party Imports ----- */
import fs from "fs";
import 'dotenv/config';
import { sql } from "@vercel/postgres";

// Demonstrate connection to database
async function getPosts() {
  const test = await sql`
  SELECT * FROM test;
`;
  console.log("test is ", test)
}
//getPosts();

async function seedWords() {
  const solutionsArray = fs.readFileSync('./data/wordle-La.txt').toString().split("\n");
  const guessesArray = fs.readFileSync('./data/wordle-Ta.txt').toString().split("\n");
  let query = `INSERT INTO words (word, isSolution) VALUES`;
  // solutionsArray.forEach(async function(solution, index) {
  //   if (index == 0) {
  //     query = query + `\n(\'${solution}\', TRUE)`
  //   }
  //   else if (index < solutionsArray.length - 1){
  //     query = query + `,\n(\'${solution}\', TRUE)`
  //   }
  //   else {
  //     query = query + `,\n(\'${solution}\', TRUE);`
  //   }
  // });
  //console.log(query);
  //const insert = await sql.query(query);
  guessesArray.forEach(async function(guess, index) {
    if (index == 0) {
      query = query + `\n(\'${guess}\', FALSE)`
    }
    else if (index < guessesArray.length - 1){
      query = query + `,\n(\'${guess}\', FALSE)`
    }
    else {
      query = query + `,\n(\'${guess}\', FALSE);`
    }
  });
  console.log(query);
  const insert = await sql.query(query);
}

seedWords();