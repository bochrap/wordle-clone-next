# Game Logic

## Game table columns  

CREATE TABLE games   
game_id  
user_id REFERENECS users(id)  
timestamp  
solution   
guess1 - 6  

## Game State

LocalStorage  ?

### Game Setup

Get solution to be guessed  

### Game design  

6 rows   
what row we are on state  

### After each row  

validate guess  [  2 steps ]   
database check for valid guess  
Then record guess in database  -- can be left till we implement game id storage  
check guess for correctness  
render letters with colours depending on how correct they are  
if not solution -- go next row  
