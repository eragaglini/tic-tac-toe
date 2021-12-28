// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

function bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < spaces.length; i++) {
      for (let j = 0; j < spaces[i].length; j++) {
        // Is the spot available?
        if (spaces[i][j] == null) {
          spaces[i][j] = currentPlayer;
          let score = minimax(spaces, 0, true);
          spaces[i][j] = null;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    return move;
  }
  
  
  function minimax(spaces, depth, isMaximizing) {
    //console.log(spaces);
    let result = playerWon();
    if (result) {
        if (currentPlayer == tick_x) {
            return 10;
        }
        else {
            return -10;
        }
    }
    result = playerDraw();
    if (result) {
        return 0;
    }
    return 1;
  }