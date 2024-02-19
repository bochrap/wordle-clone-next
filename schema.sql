/* ----- TEST TABLE ----- */ 
CREATE TABLE IF NOT EXISTS test (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL
);

INSERT INTO test (content) VALUES ('my test');
INSERT INTO test (content) VALUES ('my other test');

/* -----Project Tables ----- */

CREATE TABLE words ( id SERIAL PRIMARY KEY, word TEXT UNIQUE, isSolution BOOLEAN NOT NULL DEFAULT FALSE);

CREATE TABLE users ( id SERIAL PRIMARY KEY, clerk_user_id VARCHAR(255) NOT NULL, username TEXT);

CREATE TABLE games (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id),
game_start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
game_end_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
solution TEXT NOT NULL,
guess_one TEXT,
guess_two TEXT,
guess_three TEXT,
guess_four TEXT,
guess_five TEXT,
guess_six TEXT,
duration TEXT,
success BOOLEAN,
score INTEGER);
