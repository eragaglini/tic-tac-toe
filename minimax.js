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
                //spaces[i][j] = currentPlayer;
                let score = minimax(spaces,0, true);
                //spaces[i][j] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = {
                        i,
                        j
                    };
                }
            }
        }
    }
    return move;
}

let scores = {
    X: 10,
    O: -10
};


function minimax(spaces,depth, isMaximizing) {
    //return 1;
    //console.log(depth);
    // uscita dalla funzione
    let result = playerWon();
    if (result) {
        console.log(scores[result]);
        return scores[result];
    }

    result = playerDraw();
    if (result === 'tie') {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < spaces.length; i++) {
            for (let j = 0; j < spaces[i].length; j++) {
                // Is the spot available?
                if (spaces[i][j] == null) {
                    spaces[i][j] = tick_x;
                    //console.log(spaces);
                    let score = minimax(spaces, depth + 1, false);
                    spaces[i][j] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < spaces.length; i++) {
            for (let j = 0; j < spaces[i].length; j++) {
                // Is the spot available?
                if (spaces[i][j] == null) {
                    spaces[i][j] = tick_circle;
                    console.log(spaces);
                    let score = minimax(spaces, depth + 1, true);
                    spaces[i][j] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}