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
