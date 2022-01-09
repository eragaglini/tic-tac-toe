function bestMove() {
    return minimax(spaces, 0, true).index;
}

function minimax(spaces, depth, isMaximizing) {
    
    let win = playerWon();
    if (win === 'X') {
        return { score: 10 };
    }
    if (win === 'O') {
        return { score: -10 };
    }

    draw = playerDraw();
    if (draw === 'tie') {
        return { score: 0 };
    }
    let moves = [];
    let move = {};

    for (let i = 0; i < spaces.length; i++) {
        for (let j = 0; j < spaces[i].length; j++) {
            if (spaces[i][j] === null) {
                if (isMaximizing) {
                    move.index = {i: i, j: j};
                    spaces[i][j] = tick_x;
                    let result = minimax(spaces, depth + 1, false);
                    spaces[i][j] = null;
                    move.score = result.score;
                } else {
                    move.index = {i: i, j: j};
                    spaces[i][j] = tick_circle;
                    let result = minimax(spaces, depth + 1, true);
                    spaces[i][j] = null;
                    move.score = result.score;
                }
                //moves.push(move);
                moves.push({index: move.index, score: move.score});
            }
        }
    }

    var bestMove;
    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}